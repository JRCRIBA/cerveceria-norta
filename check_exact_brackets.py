import re

with open('data.js', 'r', encoding='utf-8') as f:
    data_code = f.read()

with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

def check_brackets_exact(text, name):
    stack = []
    brackets = {')': '(', '}': '{', ']': '['}
    lines = text.splitlines()
    
    # We strip strings and comments properly
    # Simple state machine for JS
    i = 0
    n = len(text)
    line = 1
    col = 1
    in_s_quote = False
    in_d_quote = False
    in_t_quote = False
    in_line_comment = False
    in_block_comment = False

    errors = []

    while i < n:
        ch = text[i]

        if ch == '\n':
            line += 1
            col = 1
            in_line_comment = False
            i += 1
            continue

        if in_line_comment:
            i += 1
            col += 1
            continue

        if in_block_comment:
            if ch == '*' and i + 1 < n and text[i+1] == '/':
                in_block_comment = False
                i += 2
                col += 2
                continue
            i += 1
            col += 1
            continue

        if in_s_quote:
            if ch == '\\':
                i += 2
                col += 2
                continue
            if ch == "'":
                in_s_quote = False
            i += 1
            col += 1
            continue

        if in_d_quote:
            if ch == '\\':
                i += 2
                col += 2
                continue
            if ch == '"':
                in_d_quote = False
            i += 1
            col += 1
            continue

        if in_t_quote:
            if ch == '\\':
                i += 2
                col += 2
                continue
            if ch == '`':
                in_t_quote = False
            elif ch == '$' and i + 1 < n and text[i+1] == '{':
                stack.append(('${', line, col))
                in_t_quote = False
                i += 2
                col += 2
                continue
            i += 1
            col += 1
            continue

        # Comments check
        if ch == '/' and i + 1 < n and text[i+1] == '/':
            in_line_comment = True
            i += 2
            col += 2
            continue

        if ch == '/' and i + 1 < n and text[i+1] == '*':
            in_block_comment = True
            i += 2
            col += 2
            continue

        # Quotes check
        if ch == "'":
            in_s_quote = True
            i += 1
            col += 1
            continue

        if ch == '"':
            in_d_quote = True
            i += 1
            col += 1
            continue

        if ch == '`':
            in_t_quote = True
            i += 1
            col += 1
            continue

        # Brackets
        if ch in ('(', '{', '['):
            stack.append((ch, line, col))
        elif ch in (')', '}', ']'):
            if not stack:
                errors.append(f"Unmatched closing '{ch}' at L{line}:C{col}")
            else:
                top, t_line, t_col = stack[-1]
                if top == '${' and ch == '}':
                    stack.pop()
                    in_t_quote = True
                elif ch in brackets and top == brackets[ch]:
                    stack.pop()
                else:
                    errors.append(f"Mismatched bracket '{ch}' at L{line}:C{col}, expected matching for '{top}' from L{t_line}:C{t_col}")

        i += 1
        col += 1

    if stack:
        for top, t_line, t_col in stack:
            errors.append(f"Unclosed bracket '{top}' opened at L{t_line}:C{t_col}")

    print(f"File/Block [{name}]: {len(errors)} bracket errors.")
    for err in errors[:10]:
        print(f"   {err}")
    return len(errors)

print("Checking data.js...")
check_brackets_exact(data_code, "data.js")

print("Checking app.js...")
check_brackets_exact(app_code, "app.js")
