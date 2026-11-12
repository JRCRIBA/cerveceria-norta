import sys
import json
import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def generate_water_control_docx(entries, output_path):
    doc = docx.Document()

    # Set page margins (1 inch)
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # 1. ENCABEZADO OFICIAL (TABLA DE 3 COLUMNAS Y 3 FILAS COMO FO-AG-002)
    header_table = doc.add_table(rows=3, cols=3)
    header_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    header_table.autofit = False

    # Widths: Col 1 = 1.5 in, Col 2 = 3.5 in, Col 3 = 1.8 in
    widths = [Inches(1.5), Inches(3.5), Inches(1.8)]
    for row in header_table.rows:
        for i, cell in enumerate(row.cells):
            cell.width = widths[i]

    # Cell (0,0) to (2,0): Brand/Logo text
    cell_logo = header_table.cell(0, 0)
    cell_logo.merge(header_table.cell(2, 0))
    p = cell_logo.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run("CERVECERÍA NORTA\nSISTEMA DE GESTIÓN DE CALIDAD")
    run.font.name = "Georgia"
    run.font.size = Pt(10)
    run.font.bold = True
    run.font.color.rgb = RGBColor(14, 35, 52) # Azul Profundo

    # Cell (0,1) to (2,1): Format Title
    cell_title = header_table.cell(0, 1)
    cell_title.merge(header_table.cell(2, 1))
    p2 = cell_title.paragraphs[0]
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run2 = p2.add_run("FORMATO DE CONTROL DE AGUA POTABLE")
    run2.font.name = "Cinzel"
    run2.font.size = Pt(12)
    run2.font.bold = True
    run2.font.color.rgb = RGBColor(77, 55, 32) # Marrón Tierra

    # Cell (0,2): Code
    c02 = header_table.cell(0, 2)
    p = c02.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run("CÓDIGO: FO-AG-002")
    run.font.size = Pt(9)
    run.font.bold = True

    # Cell (1,2): Creation Date
    c12 = header_table.cell(1, 2)
    p = c12.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run("ELABORACIÓN: AGOSTO 2024")
    run.font.size = Pt(8.5)

    # Cell (2,2): Version
    c22 = header_table.cell(2, 2)
    p = c22.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run("VERSIÓN: 1")
    run.font.size = Pt(8.5)
    run.font.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # 2. CUADRO DE PARÁMETROS Y FRECUENCIA (DECRETO 2115 DE 2007)
    param_table = doc.add_table(rows=2, cols=1)
    param_table.alignment = WD_TABLE_ALIGNMENT.CENTER

    cell_p1 = param_table.cell(0, 0)
    set_cell_background(cell_p1, "F5F2EB")
    p = cell_p1.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run("PARÁMETROS: ")
    run.font.bold = True
    run.font.size = Pt(9)
    run2 = p.add_run("Referencia Decreto 2115 de 2007, la cantidad de Cloro Libre en Agua potable es de 0.3 a 2.0 expresada en mg / L (Cl2). pH 6.5 a 9.0. Si los parámetros No Cumplen hacer una segunda toma en otro punto diferente, si la No Conformidad continúa remitirse al Programa de Control de Agua Potable y verificar las medidas correctivas a tomar.")
    run2.font.size = Pt(8.5)

    cell_p2 = param_table.cell(1, 0)
    set_cell_background(cell_p2, "F5F2EB")
    p = cell_p2.paragraphs[0]
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run("FRECUENCIA: ")
    run.font.bold = True
    run.font.size = Pt(9)
    run2 = p.add_run("Una vez al día, antes de iniciar procesos de producción.")
    run2.font.size = Pt(8.5)

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # 3. TABLA PRINCIPAL DE REGISTROS FO-AG-002
    # Columns: FECHA, HORA, LUGAR DE TOMA, CLORO (mg/L), pH, CUMPLE (SI/NO), VERIFICADOR, OBSERVACIONES
    data_table = doc.add_table(rows=1 + len(entries), cols=8)
    data_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    data_table.autofit = False

    col_widths = [Inches(0.9), Inches(0.7), Inches(1.8), Inches(0.9), Inches(0.6), Inches(0.7), Inches(1.4), Inches(1.2)]
    
    # Headers
    headers_text = [
        "FECHA\n(dd/mm/aa)", "HORA", "LUGAR DE TOMA DE MUESTRA", 
        "CLORO RESIDUAL\n(mg/L Cl2)", "NIVEL DE pH", "CUMPLE\n(SI / NO)", 
        "QUIEN HACE LA TOMA Y VERIFICA", "OBSERVACIONES / MEDIDAS"
    ]

    hdr_cells = data_table.rows[0].cells
    for i, title in enumerate(headers_text):
        hdr_cells[i].width = col_widths[i]
        set_cell_background(hdr_cells[i], "0E2334") # Azul Profundo NORTA
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(title)
        run.font.name = "Lato"
        run.font.size = Pt(8)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    # Rows
    for idx, entry in enumerate(entries):
        row_cells = data_table.rows[idx + 1].cells
        
        values = [
            entry.get("date", ""),
            entry.get("time", ""),
            entry.get("location", ""),
            f"{float(entry.get('chlorineMgL', 0)):.2f}",
            f"{float(entry.get('ph', 0)):.2f}",
            entry.get("complies", "SI"),
            entry.get("verifiedBy", ""),
            entry.get("notes", "")
        ]

        # Alternating background
        bg_fill = "FAFAFA" if idx % 2 == 0 else "FFFFFF"

        for i, val in enumerate(values):
            row_cells[i].width = col_widths[i]
            set_cell_background(row_cells[i], bg_fill)
            p = row_cells[i].paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if i in [0, 1, 3, 4, 5] else WD_ALIGN_PARAGRAPH.LEFT
            run = p.add_run(str(val))
            run.font.name = "Lato"
            run.font.size = Pt(8.5)
            if i == 5: # CUMPLE
                run.font.bold = True
                if val == "SI":
                    run.font.color.rgb = RGBColor(5, 150, 105) # Verde
                else:
                    run.font.color.rgb = RGBColor(220, 38, 38) # Rojo

    doc.save(output_path)
    print(f"Documento FO-AG-002 exportado exitosamente en: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        input_json_path = sys.argv[1]
        output_docx_path = sys.argv[2]
        with open(input_json_path, 'r', encoding='utf-8') as f:
            entries = json.load(f)
        generate_water_control_docx(entries, output_docx_path)
    else:
        # Demo execution
        sample_entries = [
            {"date": "24/08/2026", "time": "07:30", "location": "Llave de Maceración (Muela)", "chlorineMgL": 1.20, "ph": 7.20, "complies": "SI", "verifiedBy": "Ing. Julio Roberto Cristancho", "notes": "Parámetros óptimos en norma Decreto 2115."},
            {"date": "23/08/2026", "time": "07:15", "location": "Tanque de Reserva de Agua Potable", "chlorineMgL": 1.15, "ph": 7.10, "complies": "SI", "verifiedBy": "Adm. Cristian", "notes": "Lavado previo verificado."},
            {"date": "22/08/2026", "time": "07:45", "location": "Salida Filtro de Carbón Activado", "chlorineMgL": 0.95, "ph": 7.30, "complies": "SI", "verifiedBy": "Ing. Julio Roberto Cristancho", "notes": "Filtro operando con flujo normal."}
        ]
        generate_water_control_docx(sample_entries, "Formato_Control_Agua_Potable_FO_AG_002_Export.docx")
