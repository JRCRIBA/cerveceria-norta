import sys
import json
import os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def generate_storage_ingress_excel(entries, output_path):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Ingreso de Materiales"

    # Estilos NORTA
    font_title = Font(name="Georgia", size=14, bold=True, color="0E2334")
    font_sub = Font(name="Georgia", size=11, bold=True, color="4D3720")
    font_meta = Font(name="Arial", size=9, bold=True, color="1D1D1B")
    font_header = Font(name="Arial", size=10, bold=True, color="FFFFFF")
    font_data = Font(name="Arial", size=9, color="111827")

    fill_header = PatternFill(start_color="0E2334", end_color="0E2334", fill_type="solid")
    fill_even = PatternFill(start_color="FAFAFA", end_color="FAFAFA", fill_type="solid")
    fill_odd = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")
    fill_meta = PatternFill(start_color="F5F2EB", end_color="F5F2EB", fill_type="solid")

    thin_border = Border(
        left=Side(style='thin', color='D4C8B5'),
        right=Side(style='thin', color='D4C8B5'),
        top=Side(style='thin', color='D4C8B5'),
        bottom=Side(style='thin', color='D4C8B5')
    )

    # 1. ENCABEZADO OFICIAL
    ws.merge_cells('C1:G1')
    ws['C1'] = "PROGRAMA DE ALMACENAMIENTO"
    ws['C1'].font = font_title
    ws['C1'].alignment = Alignment(horizontal='center', vertical='center')

    ws['H1'] = "CÓDIGO: FO-ALM-001"
    ws['H1'].font = font_meta
    ws['H1'].alignment = Alignment(horizontal='right')

    ws['H2'] = "ELABORACIÓN: DICIEMBRE 2025"
    ws['H2'].font = font_meta
    ws['H2'].alignment = Alignment(horizontal='right')

    ws.merge_cells('C3:G3')
    ws['C3'] = "Formato de Ingreso de Materiales"
    ws['C3'].font = font_sub
    ws['C3'].alignment = Alignment(horizontal='center', vertical='center')

    ws['H4'] = "VERSIÓN 1"
    ws['H4'].font = font_meta
    ws['H4'].alignment = Alignment(horizontal='right')

    # Apply shading to metadata box
    for r in range(1, 5):
        for c in range(1, 9):
            ws.cell(row=r, column=c).fill = fill_meta

    # 2. ENCABEZADO DE TABLA (FILA 6)
    headers = [
        "FECHA DE INGRESO", "PRODUCTO / MATERIAL", "LOTE PROVEEDOR", 
        "CANTIDAD", "PROVEEDOR", "VENCIMIENTO", "OBSERVACIONES", "RESPONSABLE"
    ]

    for col_idx, h_text in enumerate(headers, 1):
        cell = ws.cell(row=6, column=col_idx, value=h_text)
        cell.font = font_header
        cell.fill = fill_header
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = thin_border
    
    ws.row_dimensions[6].height = 28

    # 3. FILAS DE DATOS
    for idx, entry in enumerate(entries, 7):
        row_values = [
            entry.get("date", ""),
            entry.get("product", ""),
            entry.get("batchLot", ""),
            entry.get("quantity", ""),
            entry.get("supplier", ""),
            entry.get("expiryDate", ""),
            entry.get("notes", ""),
            entry.get("responsible", "")
        ]

        row_fill = fill_even if idx % 2 == 0 else fill_odd

        for col_idx, val in enumerate(row_values, 1):
            cell = ws.cell(row=idx, column=col_idx, value=val)
            cell.font = font_data
            cell.fill = row_fill
            cell.border = thin_border
            align = 'center' if col_idx in [1, 3, 6] else ('left' if col_idx in [2, 5, 7, 8] else 'right')
            cell.alignment = Alignment(horizontal=align, vertical='center')

    # Adjust Column Widths
    col_widths = [16, 32, 18, 14, 25, 16, 30, 25]
    for col_idx, w in enumerate(col_widths, 1):
        col_letter = get_column_letter(col_idx)
        ws.column_dimensions[col_letter].width = w

    wb.save(output_path)
    print(f"Excel FO-ALM-001 exportado exitosamente en: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        input_json_path = sys.argv[1]
        output_excel_path = sys.argv[2]
        with open(input_json_path, 'r', encoding='utf-8') as f:
            entries = json.load(f)
        generate_storage_ingress_excel(entries, output_excel_path)
    else:
        sample_entries = [
            {"date": "24/08/2026", "product": "Malta Pale Ale 2-Row (Sacos 25kg)", "batchLot": "MAL-AND-2026-08", "quantity": "1,000 kg", "supplier": "Maltería Andina S.A.S.", "expiryDate": "15/08/2027", "notes": "Empaques sellados e inspeccionados. COA adjunto.", "responsible": "Ing. Julio Roberto Cristancho"},
            {"date": "22/08/2026", "product": "Lúpulo Citra T-90 Pellets", "batchLot": "HOP-YAK-2026-19", "quantity": "25 kg", "supplier": "Yakima Chief Hops", "expiryDate": "30/11/2027", "notes": "Empaque al vacío a -18°C conforme.", "responsible": "Adm. Cristian"},
            {"date": "20/08/2026", "product": "Botellas Cerámicas NORTA 500ml", "batchLot": "BOT-ENV-2026-04", "quantity": "2,400 uds", "supplier": "Envases Rústicos S.A.", "expiryDate": "N/A", "notes": "Estibas limpias sin rupturas.", "responsible": "Ing. Julio Roberto Cristancho"}
        ]
        generate_storage_ingress_excel(sample_entries, "Formato_Ingreso_Materiales_FO_ALM_001_Export.xlsx")
