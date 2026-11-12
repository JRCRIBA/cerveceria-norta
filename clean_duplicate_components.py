with open('app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

def remove_duplicate_component(code, comp_name):
    first_pos = code.find(f"function {comp_name}")
    if first_pos != -1:
        second_pos = code.find(f"function {comp_name}", first_pos + 1)
        if second_pos != -1:
            next_block = code.find("// ==========================================================================", second_pos)
            if next_block != -1:
                return code[:second_pos] + code[next_block:]
            else:
                render_pos = code.rfind("// ==========================================================================\n// RENDERIZAR LA APLICACIÓN REACT")
                if render_pos > second_pos:
                    return code[:second_pos] + code[render_pos:]
    return code

components_list = [
    "FermentationSvgChart",
    "CleaningSanitationModuleSection", 
    "WasteManagementModuleSection", 
    "MaintenanceModuleSection", 
    "SamplingModuleSection", 
    "SuppliersModuleSection", 
    "TraceabilityModuleSection",
    "CalibrationModuleSection", 
    "TrainingModuleSection", 
    "PestControlModuleSection", 
    "StorageIngressFormSection"
]

for comp in components_list:
    app_code = remove_duplicate_component(app_code, comp)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("app.js limpiado de duplicados incluyendo FermentationSvgChart.")
