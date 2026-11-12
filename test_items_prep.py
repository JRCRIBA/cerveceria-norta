import re

# Tabla de ítems a ingresar
new_items_data = [
    {
        "name": "Malta Pale Ale - Best Pale Ale",
        "category": "Maltas",
        "qty": 252.0,
        "price": 7059,
        "unit": "kg",
        "minStock": 50.0,
        "supplier": "BestMalz Alemania / Distribuidor Local"
    },
    {
        "name": "Malta Caramel Amber",
        "category": "Maltas",
        "qty": 10.0,
        "price": 8151,
        "unit": "kg",
        "minStock": 5.0,
        "supplier": "BestMalz / Weyermann"
    },
    {
        "name": "Malta Avena",
        "category": "Maltas",
        "qty": 8.0,
        "price": 17899,
        "unit": "kg",
        "minStock": 4.0,
        "supplier": "Maltería Especializada"
    },
    {
        "name": "Malta Chocolate",
        "category": "Maltas",
        "qty": 3.0,
        "price": 9580,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "Weyermann Specialty"
    },
    {
        "name": "Malta Biscuit",
        "category": "Maltas",
        "qty": 2.0,
        "price": 9496,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "Castle Malting"
    },
    {
        "name": "Malta Melano (Melanoidina)",
        "category": "Maltas",
        "qty": 4.0,
        "price": 7983,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "Weyermann Specialty"
    },
    {
        "name": "Malta Trigo",
        "category": "Maltas",
        "qty": 4.0,
        "price": 7311,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "BestMalz / Maltería Andina"
    },
    {
        "name": "Malta Caramel Pils",
        "category": "Maltas",
        "qty": 7.0,
        "price": 7815,
        "unit": "kg",
        "minStock": 3.0,
        "supplier": "BestMalz / Weyermann"
    },
    {
        "name": "Malta Negra Extra",
        "category": "Maltas",
        "qty": 2.0,
        "price": 12017,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "Castle Malting / Weyermann"
    },
    {
        "name": "Malta Caramel Munich 2",
        "category": "Maltas",
        "qty": 3.0,
        "price": 9748,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "Weyermann Specialty"
    },
    {
        "name": "Cebada Tostada",
        "category": "Maltas",
        "qty": 5.0,
        "price": 8487,
        "unit": "kg",
        "minStock": 2.0,
        "supplier": "Maltería Especializada"
    },
    {
        "name": "Saborizante Cereza (Frasco 4 Oz)",
        "category": "Adjuntos e Ingredientes Especiales",
        "qty": 1.0,
        "price": 32773,
        "unit": "frascos (4oz)",
        "minStock": 1.0,
        "supplier": "Insumos Cerveceros & Esencias"
    },
    {
        "name": "Cáscara de Naranja Dulce (Bolsa 1 Oz)",
        "category": "Adjuntos e Ingredientes Especiales",
        "qty": 2.0,
        "price": 15126,
        "unit": "bolsas (1oz)",
        "minStock": 1.0,
        "supplier": "Insumos Botánicos & Especias"
    },
    {
        "name": "Lúpulo Cascade",
        "category": "Lúpulos",
        "qty": 1.85,
        "price": 126050,
        "unit": "kg",
        "minStock": 1.0,
        "supplier": "Yakima Chief Hops / Distribuidor"
    },
    {
        "name": "Lúpulo East Kent Golding",
        "category": "Lúpulos",
        "qty": 0.80,
        "price": 193277,
        "unit": "kg",
        "minStock": 0.5,
        "supplier": "Hopunion / BarthHaas"
    },
    {
        "name": "Levadura SafAle US-05",
        "category": "Levaduras",
        "qty": 1.0,
        "price": 277311,
        "unit": "paquetes (500g)",
        "minStock": 1.0,
        "supplier": "Fermentis by Lesaffre"
    },
    {
        "name": "Clarificante Whirlfloc",
        "category": "Químicos CIP & Coadyuvantes",
        "qty": 0.50,
        "price": 260504,
        "unit": "kg",
        "minStock": 0.2,
        "supplier": "Ecolab / Proveedor Cervezero"
    },
    {
        "name": "Romero Seco Especial",
        "category": "Adjuntos e Ingredientes Especiales",
        "qty": 1.0,
        "price": 20000,
        "unit": "kg",
        "minStock": 0.5,
        "supplier": "Hierbas y Especias de Origen"
    },
    {
        "name": "Miel Pura de Abejas",
        "category": "Adjuntos e Ingredientes Especiales",
        "qty": 1.0,
        "price": 217800,
        "unit": "kg",
        "minStock": 0.5,
        "supplier": "Apiarios Andinos"
    },
    {
        "name": "Pimienta Negra en Pepa",
        "category": "Adjuntos e Ingredientes Especiales",
        "qty": 1.0,
        "price": 5000,
        "unit": "kg",
        "minStock": 0.5,
        "supplier": "Especias del Campo"
    },
    {
        "name": "Jalapeños Frescos / Seleccionados",
        "category": "Adjuntos e Ingredientes Especiales",
        "qty": 1.0,
        "price": 12500,
        "unit": "kg",
        "minStock": 0.5,
        "supplier": "Huerta Andina Agropecuaria"
    }
]

# Ítem de Maquinaria y Equipo
machinery_item = {
    "id": "ACT-CRB-01",
    "name": "Piedra Carbonadora Inox 2 Micrones",
    "category": "Maduración y Carbonatación",
    "purchaseDate": "2026-09-20",
    "acquisitionCost": 33613,
    "usefulLifeYears": 5,
    "currentStatus": "Operativo 🟢",
    "depreciationAccumulated": 0
}

print(f"Total raw items to insert: {len(new_items_data)}")
print(f"Total machinery items to insert: 1")
print(f"Total value of raw: {sum(x['qty'] * x['price'] for x in new_items_data):,.2f} COP")
