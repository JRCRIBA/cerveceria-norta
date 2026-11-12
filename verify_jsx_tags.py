import re

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

VOID_TAGS = {'img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'path', 'col', 'embed', 'param', 'track', 'wbr'}

def check_jsx_tags(code, name):
    # Strip string literals and JS comments
    i = 0
    n = len(code)
    clean_chars = []
    
    in_s = False
    in_d = False
    in_t = False
    in_lc = False
    in_bc = False
    
    while i < n:
        ch = code[i]
        
        if in_lc:
            if ch == '\n':
                in_lc = False
                clean_chars.append('\n')
            else:
                clean_chars.append(' ')
            i += 1
            continue
            
        if in_bc:
            if ch == '*' and i + 1 < n and code[i+1] == '/':
                in_bc = False
                clean_chars.append(' ')
                clean_chars.append(' ')
                i += 2
                continue
            clean_chars.append('\n' if ch == '\n' else ' ')
            i += 1
            continue

        if in_s:
            if ch == '\\':
                clean_chars.append('  ')
                i += 2
                continue
            if ch == "'":
                in_s = False
            clean_chars.append(' ')
            i += 1
            continue

        if in_d:
            if ch == '\\':
                clean_chars.append('  ')
                i += 2
                continue
            if ch == '"':
                in_d = False
            clean_chars.append(' ')
            i += 1
            continue

        if in_t:
            if ch == '\\':
                clean_chars.append('  ')
                i += 2
                continue
            if ch == '`':
                in_t = False
            clean_chars.append(' ')
            i += 1
            continue

        if ch == '/' and i + 1 < n and code[i+1] == '/':
            in_lc = True
            clean_chars.append('  ')
            i += 2
            continue

        if ch == '/' and i + 1 < n and code[i+1] == '*':
            in_bc = True
            clean_chars.append('  ')
            i += 2
            continue

        if ch == "'":
            in_s = True
            clean_chars.append(' ')
            i += 1
            continue

        if ch == '"':
            in_d = True
            clean_chars.append(' ')
            i += 1
            continue

        if ch == '`':
            in_t = True
            clean_chars.append(' ')
            i += 1
            continue

        clean_chars.append(ch)
        i += 1

    clean_code = "".join(clean_chars)
    
    # Match tags: <tag ...>, </tag>, <tag ... />
    tag_regex = re.compile(r'</?\s*([a-zA-Z0-9_-]+)(?:\s+[^>]*?)?\s*(/?)>')
    
    stack = []
    errors = []
    
    lines = clean_code.splitlines()
    for line_idx, line in enumerate(lines, 1):
        for m in tag_regex.finditer(line):
            full_tag = m.group(0)
            tag_name = m.group(1)
            is_self_closing = m.group(2) == '/'
            is_closing = full_tag.startswith('</')

            if tag_name.lower() in VOID_TAGS or is_self_closing:
                continue

            if is_closing:
                if not stack:
                    errors.append(f"Unexpected closing tag </{tag_name}> at line {line_idx}")
                else:
                    top_tag, top_line = stack[-1]
                    if top_tag == tag_name:
                        stack.pop()
                    else:
                        errors.append(f"Mismatched tag </{tag_name}> at line {line_idx}, expected </{top_tag}> opened at line {top_line}")
            else:
                stack.append((tag_name, line_idx))

    if stack:
        for top_tag, top_line in stack:
            errors.append(f"Unclosed JSX tag <{top_tag}> opened at line {top_line}")

    print(f"JSX Check [{name}]: {len(errors)} tag errors.")
    for err in errors[:10]:
        print(f"   - {err}")
    return len(errors)

check_jsx_tags(app_code, "app.js")
