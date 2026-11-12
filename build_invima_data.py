import os
import json

base_dir = r'C:\Users\Julio Cristancho\.gemini\antigravity\scratch\cerveceria-norta\invima_docs'

# Ordenar carpetas numéricamente del 1 al 11
folders = sorted(
    [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))],
    key=lambda x: int(x.split('.')[0]) if x.split('.')[0].isdigit() else x
)

invima_programs = []

for idx, folder_name in enumerate(folders, 1):
    folder_path = os.path.join(base_dir, folder_name)
    # Excluir archivos temporales de bloqueo de Office (~$...)
    files = sorted([
        f for f in os.listdir(folder_path) 
        if os.path.isfile(os.path.join(folder_path, f)) and not f.startswith('~$')
    ])
    
    file_list = []
    for f_idx, f in enumerate(files, 1):
        fpath = os.path.join(folder_path, f)
        size_bytes = os.path.getsize(fpath)
        size_mb = f"{size_bytes / (1024*1024):.2f} MB" if size_bytes > 1024*1024 else f"{size_bytes / 1024:.1f} KB"
        ext = os.path.splitext(f)[1].lower()
        file_type = "Microsoft Word" if ext == ".docx" else ("Microsoft Excel" if ext == ".xlsx" else "Documento PDF" if ext == ".pdf" else "Documento")
        
        file_list.append({
            "id": f"INV-DOC-{idx:02d}-{f_idx:02d}",
            "name": f,
            "relPath": f"./invima_docs/{folder_name}/{f}",
            "size": size_mb,
            "extension": ext,
            "type": file_type,
            "status": "Vigente & Aprobado",
            "updatedAt": "2026-08-24"
        })
        
    invima_programs.append({
        "id": f"PRG-{idx:02d}",
        "folderName": folder_name,
        "title": folder_name,
        "fileCount": len(file_list),
        "status": "Vigente 🟢",
        "files": file_list
    })

with open('invima_seed.json', 'w', encoding='utf-8') as out:
    json.dump(invima_programs, out, ensure_ascii=False, indent=2)

total_files = sum(p["fileCount"] for p in invima_programs)
print(f"Procesados {len(invima_programs)} programas sanitarios con {total_files} documentos válidos.")
