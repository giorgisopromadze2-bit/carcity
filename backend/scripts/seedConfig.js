require("dotenv").config();
const mongoose = require("mongoose");
const Config = require("../models/Config");

const SEED = [
    {
        key: "brands",
        value: [
            "Mercedes-Benz", "BMW", "Audi", "Volkswagen", "Porsche", "Opel", "Maybach", "Smart", "Alpina", "MAN", "Gumpert", "Borgward", "Wiesmann",
            "Toyota", "Lexus", "Nissan", "Infiniti", "Honda", "Acura", "Mazda", "Subaru", "Mitsubishi", "Suzuki", "Daihatsu", "Isuzu", "Scion", "Datsun", "Mitsuoka",
            "Hyundai", "Kia", "Genesis", "Daewoo", "SsangYong", "Renault Samsung",
            "Ford", "Lincoln", "Chevrolet", "Cadillac", "GMC", "Dodge", "Jeep", "Chrysler", "RAM", "Tesla", "Buick", "Pontiac", "Hummer", "Oldsmobile", "Mercury", "Saturn", "Rivian", "Lucid", "Fisker", "Saleen", "SSC",
            "Ferrari", "Lamborghini", "Maserati", "Fiat", "Alfa Romeo", "Lancia", "Pagani", "Abarth", "Iveco", "De Tomaso",
            "Renault", "Peugeot", "Citroen", "Bugatti", "Alpine", "DS Automobiles",
            "Rolls-Royce", "Bentley", "Aston Martin", "Jaguar", "Land Rover", "MINI", "McLaren", "Lotus", "MG", "Rover", "Vauxhall", "TVR",
            "Volvo", "Saab", "Koenigsegg", "Polestar", "Scania",
            "BYD", "Geely", "Chery", "Great Wall Motors", "Haval", "Zeekr", "NIO", "XPeng", "Li Auto", "Hongqi", "Lynk & Co", "JAC", "FAW", "Dongfeng", "BAIC", "Changan",
            "Tata Motors", "Mahindra", "Maruti Suzuki", "Force Motors", "Hindustan Motors",
            "Lada", "UAZ", "GAZ", "Moskvitch", "Kamaz", "Aurus",
            "Skoda", "Tatra", "SEAT", "Cupra", "Hispano Suiza",
            "Dacia", "ARO", "TOGG", "Anadolu", "Rimac",
            "Spyker", "Donkervoort", "Zenvo", "FSO", "Arrinera", "ZAZ",
            "Troller", "Puma", "Proton", "Perodua", "Holden", "Adam Motors",
            "Iran Khodro", "SAIPA", "VinFast",
            "Hennessey", "Brabus", "Ruf", "Noble", "Ariel", "BAC", "Vector", "Panoz", "SSC Tuatara",
            "Freightliner", "Peterbilt", "Kenworth", "DAF", "Solaris",
            "Jetour", "Avatr", "Omoda", "Jaecoo"
        ]
    },
    {
        key: "models",
        value: {
            // ─── გერმანია ───────────────────────────────────────────────
            "Mercedes-Benz": [
                "A-Class", "B-Class", "C-Class", "CLA", "CLA Shooting Brake", "CLS",
                "E-Class", "E-Class Coupe", "E-Class Cabrio", "S-Class", "S-Class Coupe",
                "G-Class", "GLA", "GLB", "GLC", "GLC Coupe", "GLE", "GLE Coupe", "GLS",
                "SL", "SLC", "AMG GT", "AMG GT 4-Door", "AMG C 63", "AMG E 63", "AMG S 63",
                "AMG G 63", "AMG GLE 63", "AMG GLS 63", "AMG A 45", "AMG CLA 45",
                "EQA", "EQB", "EQC", "EQE", "EQE SUV", "EQS", "EQS SUV",
                "V-Class", "Vito", "Sprinter", "Citan", "Marco Polo"
            ],
            "BMW": [
                "1 Series", "2 Series", "2 Series Gran Coupe", "2 Series Active Tourer",
                "3 Series", "3 Series Touring", "4 Series", "4 Series Gran Coupe", "4 Series Cabrio",
                "5 Series", "5 Series Touring", "6 Series", "6 Series Gran Turismo",
                "7 Series", "8 Series", "8 Series Gran Coupe", "8 Series Cabrio",
                "X1", "X2", "X3", "X3 M", "X4", "X4 M", "X5", "X5 M", "X6", "X6 M", "X7",
                "Z4", "M2", "M3", "M3 Touring", "M4", "M4 Cabrio", "M5", "M8",
                "i3", "i4", "i5", "i7", "iX", "iX1", "iX2", "iX3",
                "2 Series Coupe", "128ti", "M135i"
            ],
            "Audi": [
                "A1", "A1 Sportback", "A3", "A3 Sportback", "A3 Sedan", "A4", "A4 Avant", "A4 Allroad",
                "A5", "A5 Sportback", "A5 Cabriolet", "A6", "A6 Avant", "A6 Allroad",
                "A7", "A7 Sportback", "A8", "A8 L",
                "Q2", "Q3", "Q3 Sportback", "Q4 e-tron", "Q5", "Q5 Sportback", "Q7", "Q8", "Q8 e-tron",
                "TT", "TT Roadster", "TTS", "TT RS", "R8", "R8 Spyder",
                "RS3", "RS4", "RS5", "RS6", "RS7", "RS Q3", "RS Q8",
                "e-tron GT", "RS e-tron GT", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "SQ8"
            ],
            "Volkswagen": [
                "Polo", "Polo GTI", "Golf", "Golf GTI", "Golf R", "Golf Variant", "Golf Alltrack",
                "Jetta", "Passat", "Passat Variant", "Passat Alltrack", "Arteon", "Arteon Shooting Brake",
                "Tiguan", "Tiguan Allspace", "Touareg", "T-Cross", "T-Roc", "T-Roc Cabrio",
                "Atlas", "Atlas Cross Sport", "Taos", "ID.3", "ID.4", "ID.5", "ID.6", "ID.7",
                "Touran", "Sharan", "Caddy", "Transporter", "Multivan", "Caravelle",
                "Amarok", "Crafter", "up!", "e-up!"
            ],
            "Porsche": [
                "911 Carrera", "911 Carrera S", "911 Carrera 4", "911 Carrera 4S",
                "911 Targa 4", "911 Targa 4S", "911 Turbo", "911 Turbo S",
                "911 GT3", "911 GT3 RS", "911 GT2 RS", "911 R", "911 Sport Classic",
                "718 Boxster", "718 Boxster S", "718 Boxster GTS", "718 Boxster Spyder",
                "718 Cayman", "718 Cayman S", "718 Cayman GTS", "718 Cayman GT4", "718 Cayman GT4 RS",
                "Cayenne", "Cayenne S", "Cayenne GTS", "Cayenne Turbo", "Cayenne Turbo S E-Hybrid", "Cayenne Coupe",
                "Macan", "Macan S", "Macan GTS", "Macan Turbo",
                "Panamera", "Panamera 4S", "Panamera GTS", "Panamera Turbo", "Panamera Sport Turismo",
                "Taycan", "Taycan 4S", "Taycan GTS", "Taycan Turbo", "Taycan Turbo S",
                "Taycan Cross Turismo", "Taycan Sport Turismo"
            ],
            "Opel": [
                "Corsa", "Corsa-e", "Astra", "Astra Sports Tourer", "Astra-e",
                "Insignia", "Insignia Sports Tourer", "Mokka", "Mokka-e",
                "Crossland", "Grandland", "Grandland X", "Zafira", "Zafira Life",
                "Vectra", "Omega", "Kadett", "Combo", "Vivaro", "Movano"
            ],
            "Maybach": ["S 580", "S 650", "S 680", "GLS 600", "57", "62", "57 S", "62 S", "Landaulet"],
            "Smart": ["Fortwo", "Fortwo Cabrio", "Forfour", "#1", "#3", "EQ Fortwo", "EQ Forfour"],
            "Alpina": ["B3", "B4", "B5", "B7", "B8", "D3", "D4", "D5", "XB7", "XD3", "XD4"],
            "MAN": ["TGE", "TGL", "TGM", "TGS", "TGX", "Lion's City", "Lion's Coach"],
            "Gumpert": ["Apollo", "Apollo S", "Apollo R", "Explosion"],
            "Borgward": ["BX3", "BX5", "BX6", "BX7"],
            "Wiesmann": ["GT MF4", "GT MF5", "Roadster MF3", "Roadster MF4", "Project Gecko"],

            // ─── იაპონია ────────────────────────────────────────────────
            "Toyota": [
                "Yaris", "Yaris Cross", "Yaris GR", "GR86", "GR Supra",
                "Corolla", "Corolla Cross", "Corolla Touring Sports", "Corolla GR Sport",
                "Camry", "Avalon", "Prius", "Prius PHV", "C-HR",
                "RAV4", "RAV4 Hybrid", "RAV4 Prime", "RAV4 Adventure",
                "Highlander", "Highlander Hybrid", "Land Cruiser", "Land Cruiser 300",
                "Land Cruiser Prado", "FJ Cruiser", "4Runner", "Sequoia",
                "Hilux", "Tacoma", "Tundra", "Fortuner",
                "Sienna", "Alphard", "Vellfire", "Noah", "Voxy",
                "Auris", "Avensis", "Verso", "Urban Cruiser",
                "bZ4X", "Mirai", "Proace", "Proace City"
            ],
            "Lexus": [
                "IS 200t", "IS 300", "IS 300h", "IS 350", "IS 500",
                "ES 250", "ES 300h", "ES 350",
                "GS 200t", "GS 300", "GS 350", "GS 450h",
                "LS 350", "LS 500", "LS 500h",
                "UX 200", "UX 250h",
                "NX 200t", "NX 250", "NX 300h", "NX 350h", "NX 450h+",
                "RX 300", "RX 350", "RX 350h", "RX 450h", "RX 500h",
                "GX 460", "GX 550",
                "LX 450d", "LX 570", "LX 600",
                "RC 300", "RC 350", "RC F",
                "LC 500", "LC 500h",
                "CT 200h", "LM 350h"
            ],
            "Nissan": [
                "Micra", "Note", "Leaf", "Ariya",
                "Sentra", "Versa", "Altima", "Maxima",
                "Juke", "Qashqai", "X-Trail", "Murano", "Pathfinder", "Armada",
                "Rogue", "Rogue Sport", "Kicks",
                "Patrol", "Terra", "Navara", "Frontier",
                "370Z", "400Z", "GT-R", "Skyline",
                "NV200", "Interstar", "Primastar"
            ],
            "Infiniti": ["Q30", "Q50", "Q60", "Q70", "QX30", "QX50", "QX55", "QX60", "QX70", "QX80", "FX35", "FX37", "FX50", "EX35", "G37"],
            "Honda": [
                "Jazz", "Jazz e:HEV", "City", "Civic", "Civic Type R", "Civic e:HEV",
                "Accord", "Legend", "Integra",
                "HR-V", "CR-V", "CR-V e:PHEV", "ZR-V", "Pilot", "Passport", "Ridgeline",
                "BR-V", "WR-V", "Odyssey", "Element",
                "S2000", "NSX", "e", "Prologue",
                "Fit", "Insight", "Clarity"
            ],
            "Acura": ["ILX", "TLX", "TLX Type S", "RLX", "RDX", "MDX", "MDX Type S", "NSX", "ZDX", "CDX", "RDX A-Spec"],
            "Mazda": [
                "Mazda2", "Mazda3", "Mazda3 Fastback", "Mazda6",
                "CX-3", "CX-30", "CX-5", "CX-60", "CX-80", "CX-90", "CX-9",
                "MX-5", "MX-5 RF", "MX-30", "MX-30 R-EV",
                "BT-50", "CX-50"
            ],
            "Subaru": [
                "Impreza", "Impreza e-Boxer", "Legacy", "Outback", "Outback e-Boxer",
                "WRX", "WRX STI", "BRZ",
                "XV", "Crosstrek", "Forester", "Forester e-Boxer",
                "Ascent", "Solterra", "Baja", "Tribeca"
            ],
            "Mitsubishi": [
                "Mirage", "Colt", "Lancer", "Lancer Evolution",
                "Eclipse Cross", "Eclipse Cross PHEV", "ASX", "Outlander", "Outlander PHEV",
                "Pajero", "Pajero Sport", "L200", "Triton",
                "Galant", "Carisma", "Space Star"
            ],
            "Suzuki": [
                "Alto", "Celerio", "Swift", "Swift Sport", "Baleno", "Ciaz",
                "Ignis", "SX4 S-Cross", "Vitara", "Vitara Hybrid",
                "Jimny", "Jimny Sierra", "Grand Vitara",
                "Across", "Swace", "Kizashi", "Carry"
            ],
            "Daihatsu": ["Mira", "Move", "Tanto", "Hijet", "Terios", "Rocky", "Copen", "Boon", "Thor"],
            "Isuzu": ["D-Max", "D-Max V-Cross", "MU-X", "Trooper", "Rodeo", "Elf", "Forward"],
            "Scion": ["tC", "xB", "xD", "FR-S", "iA", "iM"],
            "Datsun": ["Go", "Go+", "On-Do", "Mi-Do", "Redi-Go"],
            "Mitsuoka": ["Orochi", "Buddy", "Himiko", "Like", "Ray", "Galue"],

            // ─── კორეა ──────────────────────────────────────────────────
            "Hyundai": [
                "i10", "i20", "i20 N", "i30", "i30 N", "i30 Fastback", "i40",
                "Elantra", "Elantra N", "Sonata", "Azera",
                "Venue", "Kona", "Kona Electric", "Kona N", "Tucson", "Tucson Hybrid",
                "Santa Fe", "Santa Fe Hybrid", "Palisade", "Santa Cruz",
                "Nexo", "IONIQ", "IONIQ 5", "IONIQ 5 N", "IONIQ 6", "IONIQ 9",
                "Accent", "Veloster", "Veloster N", "Genesis Coupe",
                "Staria", "Custo", "H-1", "Porter"
            ],
            "Kia": [
                "Picanto", "Rio", "Stonic", "Ceed", "Ceed SW", "ProCeed", "XCeed",
                "Cerato", "K3", "K5", "Stinger", "K8", "K9",
                "Niro", "Niro EV", "Niro PHEV", "Soul", "Soul EV",
                "Seltos", "Sportage", "Sportage Hybrid", "Sorento", "Sorento Hybrid",
                "Telluride", "Carnival", "EV6", "EV9",
                "Mohave", "Bongo"
            ],
            "Genesis": ["G70", "G70 Shooting Brake", "G80", "G80 Electrified", "G90", "GV60", "GV70", "GV70 Electrified", "GV80", "GV80 Coupe", "X Concept"],
            "Daewoo": ["Matiz", "Lanos", "Nubira", "Lacetti", "Leganza", "Magnus", "Tosca", "Kalos", "Tacuma", "Rezzo"],
            "SsangYong": ["Tivoli", "Tivoli Air", "Korando", "Korando e-Motion", "Rexton", "Rexton Sports", "Musso", "Actyon", "Rodius"],
            "Renault Samsung": ["SM3", "SM5", "SM6", "SM7", "QM3", "QM5", "QM6"],

            // ─── ამერიკა ─────────────────────────────────────────────────
            "Ford": [
                "Fiesta", "Fiesta ST", "Focus", "Focus ST", "Focus RS",
                "Fusion", "Mondeo", "Mustang", "Mustang Mach-E", "Mustang GT500",
                "Explorer", "Explorer ST", "Expedition", "Bronco", "Bronco Sport",
                "Escape", "Edge", "Puma", "Kuga", "EcoSport",
                "F-150", "F-150 Lightning", "F-150 Raptor", "F-250", "F-350",
                "Ranger", "Ranger Raptor", "Maverick",
                "Galaxy", "S-Max", "Transit", "Transit Custom", "Transit Connect",
                "GT", "Thunderbird", "Crown Victoria"
            ],
            "Lincoln": ["Continental", "MKZ", "Corsair", "Nautilus", "Aviator", "Navigator", "Navigator L", "MKC", "MKT", "MKX"],
            "Chevrolet": [
                "Spark", "Sonic", "Cruze", "Malibu", "Impala",
                "Camaro", "Camaro ZL1", "Corvette", "Corvette Z06", "Corvette ZR1",
                "Trax", "Trailblazer", "Equinox", "Blazer", "Traverse",
                "Tahoe", "Suburban", "Silverado", "Silverado EV", "Colorado",
                "Bolt EV", "Bolt EUV", "Blazer EV",
                "Express", "HHR", "Captiva", "Orlando", "Aveo"
            ],
            "Cadillac": [
                "CT4", "CT4-V", "CT4-V Blackwing", "CT5", "CT5-V", "CT5-V Blackwing",
                "CTS", "ATS", "XTS", "DTS",
                "XT4", "XT5", "XT6", "Escalade", "Escalade ESV", "Escalade IQ",
                "Lyriq", "Celestiq", "Optiq"
            ],
            "GMC": ["Terrain", "Envoy", "Acadia", "Yukon", "Yukon XL", "Sierra 1500", "Sierra 2500HD", "Sierra 3500HD", "Canyon", "Hummer EV", "Savana"],
            "Dodge": ["Dart", "Charger", "Challenger", "Challenger SRT Hellcat", "Challenger SRT Demon", "Durango", "Durango SRT", "Journey", "Viper", "Nitro"],
            "Jeep": ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Grand Cherokee L", "Grand Cherokee 4xe", "Wrangler", "Wrangler 4xe", "Gladiator", "Grand Wagoneer"],
            "Chrysler": ["200", "300", "300C", "Pacifica", "Pacifica Hybrid", "Voyager", "Sebring", "PT Cruiser"],
            "RAM": ["1500", "1500 Classic", "1500 TRX", "2500", "3500", "ProMaster", "ProMaster City"],
            "Tesla": ["Model S", "Model S Plaid", "Model 3", "Model 3 Performance", "Model X", "Model X Plaid", "Model Y", "Model Y Performance", "Cybertruck", "Roadster", "Semi"],
            "Buick": ["Encore", "Encore GX", "Envision", "Enclave", "LaCrosse", "Verano", "Regal", "Cascada", "Envista"],
            "Pontiac": ["GTO", "Firebird", "Trans Am", "G6", "G8", "Solstice", "Vibe", "Bonneville", "Grand Prix", "Grand Am"],
            "Hummer": ["H1", "H2", "H3", "H3T", "EV Pickup", "EV SUV"],
            "Oldsmobile": ["Alero", "Aurora", "Bravada", "Cutlass", "Intrigue", "Silhouette"],
            "Mercury": ["Grand Marquis", "Milan", "Mountaineer", "Mariner", "Sable"],
            "Saturn": ["Ion", "Vue", "Aura", "Outlook", "Sky"],
            "Rivian": ["R1T", "R1S", "R2", "R3"],
            "Lucid": ["Air", "Air Grand Touring", "Air Sapphire", "Gravity"],
            "Fisker": ["Ocean", "Ocean Extreme", "PEAR", "Alaska"],
            "Saleen": ["S7", "S7 Twin Turbo", "S302 Mustang", "S1"],
            "SSC": ["Ultimate Aero", "Ultimate Aero TT", "Tuatara"],

            // ─── იტალია ──────────────────────────────────────────────────
            "Ferrari": [
                "348", "355", "360", "430", "458 Italia", "458 Spider", "458 Speciale",
                "488 GTB", "488 Spider", "488 Pista", "488 Pista Spider",
                "F8 Tributo", "F8 Spider", "SF90 Stradale", "SF90 Spider",
                "Roma", "Roma Spider", "Portofino", "Portofino M",
                "812 Superfast", "812 GTS", "812 Competizione", "812 Competizione A",
                "Purosangue", "LaFerrari", "LaFerrari Aperta",
                "California", "California T", "GTC4Lusso", "GTC4Lusso T",
                "Monza SP1", "Monza SP2", "Daytona SP3"
            ],
            "Lamborghini": [
                "Gallardo", "Gallardo LP 560-4", "Gallardo Superleggera",
                "Huracan", "Huracan Evo", "Huracan Evo Spyder", "Huracan STO",
                "Huracan Tecnica", "Huracan Sterrato",
                "Aventador", "Aventador S", "Aventador SVJ", "Aventador Ultimae",
                "Revuelto", "Urus", "Urus S", "Urus Performante",
                "Murcielago", "Murcielago LP 670", "Sesto Elemento", "Centenario"
            ],
            "Maserati": ["Ghibli", "Ghibli S", "Ghibli Trofeo", "Quattroporte", "Quattroporte GTS", "Quattroporte Trofeo", "Levante", "Levante S", "Levante Trofeo", "Granturismo", "Granturismo Folgore", "Grancabrio", "MC20", "MC20 Cielo", "Grecale", "Grecale Trofeo"],
            "Fiat": ["500", "500e", "500X", "500L", "Panda", "Panda Cross", "Tipo", "Tipo SW", "Bravo", "Punto", "Grande Punto", "Doblo", "Ducato", "Talento", "Fullback", "124 Spider"],
            "Alfa Romeo": ["MiTo", "Giulietta", "Giulia", "Giulia Quadrifoglio", "Stelvio", "Stelvio Quadrifoglio", "Tonale", "Tonale PHEV", "159", "156", "147", "Brera", "Spider", "8C Competizione", "4C", "4C Spider"],
            "Lancia": ["Ypsilon", "Delta", "Thema", "Flavia", "Stratos", "Aurelia"],
            "Pagani": ["Zonda", "Zonda R", "Zonda Cinque", "Huayra", "Huayra R", "Huayra Roadster", "Huayra BC", "Utopia"],
            "Abarth": ["500", "595", "595 Competizione", "595 Turismo", "695", "695 Biposto", "124 Spider"],
            "Iveco": ["Daily", "Daily Electric", "Eurocargo", "Stralis", "S-Way", "Trakker"],
            "De Tomaso": ["Pantera", "Mangusta", "Vallelunga", "P72"],

            // ─── საფრანგეთი ──────────────────────────────────────────────
            "Renault": [
                "Twingo", "Twingo E-Tech", "Clio", "Clio E-Tech", "Clio RS",
                "Megane", "Megane E-Tech", "Megane RS", "Megane RS Trophy",
                "Talisman", "Laguna", "Latitude",
                "Captur", "Captur E-Tech", "Kadjar", "Austral", "Austral E-Tech",
                "Arkana", "Koleos", "Duster", "Espace",
                "Zoe", "Kangoo E-Tech", "Scenic E-Tech",
                "Alaskan", "Master", "Trafic", "Kangoo",
                "5 E-Tech", "4 E-Tech"
            ],
            "Peugeot": [
                "108", "208", "208 GT", "e-208", "308", "308 GT", "e-308", "308 SW",
                "408", "508", "508 SW", "508 PSE",
                "2008", "e-2008", "3008", "3008 PHEV", "5008", "5008 PHEV",
                "Rifter", "Partner", "Traveller", "Expert",
                "Boxer", "Bipper", "iOn",
                "RCZ", "206", "207", "306", "307", "406", "407", "605", "607"
            ],
            "Citroen": [
                "C1", "C3", "C3 Aircross", "e-C3", "C4", "e-C4", "C4 X",
                "C5 X", "C5 Aircross", "C5 Aircross PHEV",
                "Berlingo", "e-Berlingo", "C-Elysee", "Saxo",
                "DS3", "DS3 Cabrio", "Xsara", "Xantia",
                "SpaceTourer", "Jumpy", "Jumper", "Dispatch"
            ],
            "Bugatti": ["Veyron", "Veyron Super Sport", "Chiron", "Chiron Super Sport", "Chiron Pur Sport", "Divo", "Centodieci", "Bolide", "Tourbillon", "La Voiture Noire"],
            "Alpine": ["A110", "A110 S", "A110 GT", "A110 R", "A110 Pure", "A290"],
            "DS Automobiles": ["DS 3", "DS 3 Crossback", "DS 3 E-Tense", "DS 4", "DS 4 E-Tense", "DS 7", "DS 7 E-Tense", "DS 9", "DS 9 E-Tense"],

            // ─── დიდი ბრიტანეთი ──────────────────────────────────────────
            "Rolls-Royce": ["Silver Shadow", "Silver Spirit", "Silver Seraph", "Phantom", "Phantom EWB", "Phantom Drophead", "Ghost", "Ghost Extended", "Wraith", "Dawn", "Cullinan", "Cullinan Black Badge", "Spectre"],
            "Bentley": ["Continental GT", "Continental GT V8", "Continental GT Speed", "Continental GT Mulliner", "Continental GTC", "Flying Spur", "Flying Spur V8", "Flying Spur S", "Bentayga", "Bentayga V8", "Bentayga EWB", "Mulsanne", "Mulsanne Speed", "Azure"],
            "Aston Martin": ["V8 Vantage", "V12 Vantage", "Vantage", "Vantage Roadster", "DB9", "DB11", "DB11 Volante", "DB12", "DBS", "DBS Superleggera", "DBS Volante", "DBX", "DBX707", "Vanquish", "Rapide", "One-77", "Valkyrie"],
            "Jaguar": ["XE", "XF", "XF Sportbrake", "XJ", "F-Type", "F-Type Coupe", "F-Type Convertible", "F-Type R", "F-Pace", "F-Pace SVR", "E-Pace", "I-Pace", "XK", "XKR", "S-Type", "X-Type"],
            "Land Rover": ["Defender 90", "Defender 110", "Defender 130", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover LWB", "Range Rover Sport", "Range Rover Sport SVR", "Range Rover Velar", "Range Rover Evoque", "Range Rover Evoque Convertible"],
            "MINI": ["One", "Cooper", "Cooper S", "Cooper SE", "John Cooper Works", "Convertible", "Clubman", "Clubman JCW", "Countryman", "Countryman JCW", "Countryman SE All4", "Paceman", "Coupe", "Roadster", "Aceman"],
            "McLaren": ["570S", "570GT", "600LT", "620R", "650S", "675LT", "720S", "720S Spider", "750S", "750S Spider", "765LT", "765LT Spider", "P1", "P1 GTR", "Senna", "Senna GTR", "Speedtail", "Elva", "Artura", "GT"],
            "Lotus": ["Elise", "Exige", "Exige Sport", "Evora", "Evora GT", "Emira", "Emira V6", "Eletre", "Eletre S", "Eletre R", "Emeya"],
            "MG": ["3", "ZS", "ZS EV", "HS", "HS PHEV", "MG5 EV", "MG4 EV", "Marvel R", "Cyberster", "MG6", "MG7", "GT", "GS", "RX5"],
            "Rover": ["25", "45", "75", "200", "400", "600", "800", "Metro", "CityRover", "Streetwise"],
            "Vauxhall": ["Corsa", "Corsa-e", "Astra", "Astra-e", "Insignia", "Grandland", "Mokka", "Mokka-e", "Crossland", "Combo", "Vivaro", "Movano", "Zafira"],
            "TVR": ["Tuscan", "Sagaris", "T350", "Tamora", "Cerbera", "Griffith", "Chimaera"],

            // ─── სკანდინავია ─────────────────────────────────────────────
            "Volvo": [
                "S40", "S60", "S60 Recharge", "S90", "S90 Recharge",
                "V40", "V60", "V60 Cross Country", "V60 Recharge", "V90", "V90 Cross Country",
                "XC40", "XC40 Recharge", "XC60", "XC60 Recharge", "XC90", "XC90 Recharge",
                "C30", "C40 Recharge", "EX30", "EX90",
                "850", "940", "960", "740", "760", "780"
            ],
            "Saab": ["900", "9000", "9-3", "9-3 Cabriolet", "9-3 SportCombi", "9-5", "9-5 Combi", "9-5 SportCombi", "9-4X", "9-7X", "96"],
            "Koenigsegg": ["CC8S", "CCR", "CCX", "CCXR", "Agera", "Agera R", "Agera S", "Agera RS", "One:1", "Regera", "Jesko", "Jesko Absolut", "Gemera", "CC850"],
            "Polestar": ["1", "2", "2 Long Range", "3", "4", "5", "6"],
            "Scania": ["R 450", "R 500", "R 560", "R 650", "S 500", "S 560", "S 650", "G 500", "P 360"],

            // ─── ჩინეთი ──────────────────────────────────────────────────
            "BYD": ["Han", "Han EV", "Han DM-i", "Tang", "Tang EV", "Tang DM-i", "Song", "Song Plus", "Song Pro", "Seal", "Seal U", "Atto 3", "Dolphin", "Seagull", "Sealion 6", "Yangwang U8"],
            "Geely": ["Coolray", "Monjaro", "Emgrand", "Tugella", "Azkarra", "Okavango", "Atlas Pro", "Preface", "Geometry C", "Geometry A"],
            "Chery": ["Tiggo 2", "Tiggo 4", "Tiggo 7", "Tiggo 7 Pro", "Tiggo 8", "Tiggo 8 Pro", "Arrizo 5", "Arrizo 6", "Arrizo 8", "QQ"],
            "Great Wall Motors": ["Poer", "Poer King Kong", "Tank 300", "Tank 500", "Cannon"],
            "Haval": ["H2", "H4", "H6", "H6 GT", "H6S", "H9", "Jolion", "Dargo", "Big Dog"],
            "Zeekr": ["001", "007", "009", "X"],
            "NIO": ["EC6", "ES6", "ES7", "ES8", "ET5", "ET5 Touring", "ET7", "EL6", "EL7"],
            "XPeng": ["G3", "G6", "G9", "P5", "P7", "P7i", "X9"],
            "Li Auto": ["Li ONE", "L7", "L8", "L9", "MEGA"],
            "Hongqi": ["H5", "H7", "H9", "HS5", "HS7", "E-QM5", "E-HS9", "L5"],
            "Lynk & Co": ["01", "01 PHEV", "02", "03", "03+", "05", "05 PHEV", "06", "09"],
            "JAC": ["J4", "J7", "S3", "S4", "S7", "T6", "T8", "iEV7S"],
            "FAW": ["Bestune T55", "Bestune T77", "Bestune T99", "Bestune B70", "Hongqi H9", "Hongqi E-HS9"],
            "Dongfeng": ["AX4", "AX7", "IX5", "Shine", "Fengon 500", "Fengon 600"],
            "BAIC": ["BJ20", "BJ40", "BJ80", "X3", "X5", "X7", "EU5", "EX5"],
            "Changan": ["CS35", "CS35 Plus", "CS55", "CS55 Plus", "CS75", "CS75 Plus", "UNI-T", "UNI-K", "UNI-V", "Lamore", "Deepal S7"],

            // ─── ინდოეთი ─────────────────────────────────────────────────
            "Tata Motors": ["Nano", "Tiago", "Tigor", "Altroz", "Nexon", "Nexon EV", "Punch", "Punch EV", "Harrier", "Safari", "Hexa", "Sumo"],
            "Mahindra": ["Bolero", "Bolero Neo", "Scorpio", "Scorpio N", "Scorpio Classic", "XUV300", "XUV400 EV", "XUV700", "Thar", "Thar ROXX", "BE 6e", "XEV 9e"],
            "Maruti Suzuki": ["Alto", "Alto K10", "S-Presso", "Celerio", "WagonR", "Swift", "Dzire", "Baleno", "Ignis", "Fronx", "Ciaz", "Ertiga", "XL6", "Brezza", "Grand Vitara", "Jimny", "Invicto"],
            "Force Motors": ["Gurkha", "Gurkha 5-Door", "Traveller", "Trax"],
            "Hindustan Motors": ["Ambassador", "Ambassador Classic", "Contessa"],

            // ─── რუსეთი ──────────────────────────────────────────────────
            "Lada": ["Niva", "Niva Legend", "Niva Travel", "Granta", "Granta Sport", "Vesta", "Vesta SW", "XRAY", "Largus", "2107", "2106", "2105", "2104"],
            "UAZ": ["Patriot", "Hunter", "Pickup", "Буханка", "452"],
            "GAZ": ["Volga", "Gazelle Next", "Gazelle NN", "Sobol NN", "Valdai"],
            "Moskvitch": ["3", "3e", "6", "2140", "2141"],
            "Kamaz": ["5490 Neo", "6520", "6580", "54901"],
            "Aurus": ["Senat", "Senat Limousine", "Komendant", "Arsenal"],

            // ─── ჩეხეთი / სლოვაკეთი / ესპანეთი ──────────────────────────
            "Skoda": ["Fabia", "Rapid", "Scala", "Octavia", "Octavia RS", "Octavia Combi", "Superb", "Superb Combi", "Kamiq", "Karoq", "Kodiaq", "Kodiaq RS", "Enyaq", "Enyaq Coupe", "Slavia", "Citigo"],
            "Tatra": ["Phoenix", "T815", "T158"],
            "SEAT": ["Mii", "Ibiza", "Ibiza FR", "Leon", "Leon FR", "Leon Cupra", "Leon ST", "Arona", "Ateca", "Tarraco", "Alhambra"],
            "Cupra": ["Formentor", "Formentor VZ", "Leon", "Leon VZ", "Born", "Ateca", "Tavascan", "Terramar"],
            "Hispano Suiza": ["Carmen", "Carmen Boulogne"],

            // ─── სხვა ევროპა ─────────────────────────────────────────────
            "Dacia": ["Logan", "Logan MCV", "Sandero", "Sandero Stepway", "Duster", "Duster 4x4", "Jogger", "Spring EV", "Dokker", "Lodgy"],
            "ARO": ["10", "24", "244", "320"],
            "TOGG": ["T10X", "T10F"],
            "Anadolu": ["A1"],
            "Rimac": ["Concept One", "Concept Two", "Nevera"],
            "Spyker": ["C8 Laviolette", "C8 Aileron", "C12 Zagato"],
            "Donkervoort": ["D8", "D8 GTO", "D8 GTO-S", "F22"],
            "Zenvo": ["ST1", "TS1 GT", "TSR", "TSR-S", "Aurora"],
            "FSO": ["Polonez", "Polonez Caro", "125p"],
            "Arrinera": ["Hussarya", "Hussarya GT"],
            "ZAZ": ["Tavria", "Slavuta", "Sens", "Lanos", "Forza"],

            // ─── სხვა რეგიონები ──────────────────────────────────────────
            "Proton": ["Saga", "Persona", "Iriz", "Exora", "X50", "X70", "X90"],
            "Perodua": ["Axia", "Bezza", "Myvi", "Ativa", "Aruz", "Alza"],
            "Holden": ["Spark", "Cruze", "Astra", "Malibu", "Commodore", "Colorado", "Trailblazer", "Captiva", "Acadia"],
            "VinFast": ["VF3", "VF5", "VF6", "VF7", "VF8", "VF9", "Fadil"],
            "Iran Khodro": ["Samand", "Samand LX", "Dena", "Runna", "Soren", "Tara", "Haima 7X"],
            "SAIPA": ["Tiba", "Tiba 2", "Quick", "Shahin", "Ario"],
            "Troller": ["T4"],
            "Puma": ["GT"],
            "Adam Motors": ["2EV"],

            // ─── სუპერქარები / ტიუნინგი ─────────────────────────────────
            "Hennessey": ["Venom GT", "Venom F5", "Venom F5 Roadster"],
            "Brabus": ["800", "900", "G800", "G900", "Rocket 900", "S800", "E800", "900 Rocket Edition"],
            "Ruf": ["CTR", "CTR3", "CTR Anniversary", "Rt 12", "RGT", "BTR", "Turbo R"],
            "Noble": ["M400", "M600", "M12 GTO"],
            "Ariel": ["Atom 3", "Atom 4", "Nomad", "Nomad R", "Ace"],
            "BAC": ["Mono", "Mono R"],
            "Vector": ["W8", "M12"],
            "Panoz": ["Esperante", "Esperante GTR-1", "Avezzano"],
            "SSC Tuatara": ["Tuatara"],

            // ─── სატვირთო / ავტობუსი ─────────────────────────────────────
            "Freightliner": ["Cascadia", "M2 106", "Sprinter", "Columbia", "Century Class"],
            "Peterbilt": ["389", "579", "567", "520", "348"],
            "Kenworth": ["T680", "T880", "W990", "W900", "T800", "C500"],
            "DAF": ["XF", "XG", "XG+", "CF", "LF", "XB"],
            "Solaris": ["Urbino 10", "Urbino 12", "Urbino 15", "Urbino 18", "Trollino"],

            // ─── ახალი ჩინური ─────────────────────────────────────────────
            "Jetour": ["X70", "X70 Plus", "X90", "X90 Plus", "Dashing", "T2"],
            "Avatr": ["11", "12"],
            "Omoda": ["C5", "E5", "C9"],
            "Jaecoo": ["J7", "J7 PHEV", "J8"]
        }
    },
    {
        key: "fuels",
        value: ["Petrol", "Diesel", "Hybrid", "Plug-in Hybrid", "Electric", "LPG", "CNG", "Hydrogen"]
    },
    {
        key: "transmissions",
        value: ["Automatic", "Manual", "Semi-Automatic", "CVT", "DCT"]
    },
    {
        key: "drivetrains",
        value: ["FWD", "RWD", "AWD", "4WD"]
    },
    {
        key: "allSpecs",
        value: [
            { key: "year",         label: "YEAR",         icon: "/specifications/calendar1.png" },
            { key: "mileage",      label: "MILEAGE",      icon: "/specifications/mileage2.png" },
            { key: "engine",       label: "ENGINE",       icon: "/specifications/engine1.png" },
            { key: "power",        label: "POWER",        icon: "/specifications/hp2.png" },
            { key: "fuel",         label: "FUEL",         icon: "/specifications/fuel.png" },
            { key: "transmission", label: "TRANSMISSION", icon: "/specifications/transmission.png" },
            { key: "drivetrain",   label: "DRIVETRAIN",   icon: "/specifications/drivetrain.png" },
            { key: "exterior",     label: "EXTERIOR",     icon: "/specifications/exinterior.png" },
            { key: "interior",     label: "INTERIOR",     icon: "/specifications/exinterior.png" },
            { key: "vin",          label: "VIN",          icon: "/specifications/vin.png" },
            { key: "steering",     label: "STEERING",     icon: "/specifications/steering.png" },
            { key: "customs",      label: "CUSTOMS",      icon: "/specifications/customs.png" },
            { key: "owners",       label: "OWNERS",       icon: "/specifications/owners.png" },
            { key: "seats",        label: "SEATS",        icon: "/specifications/seats.png" },
        ]
    },
    {
        key: "equipmentCats",
        value: [
            {
                key: "comfort", label: "Comfort", icon: "/sparkles1.png",
                suggestions: ["Heated seats","Ventilated seats","Ambient lighting","Panoramic roof","Memory seats","4-zone climate","Massage seats","Keyless entry","Heated steering wheel","Electric seats","Lumbar support","Head-up display","Auto-dimming mirrors","Soft-close doors"]
            },
            {
                key: "technology", label: "Technology", icon: "/technology.png",
                suggestions: ["Apple CarPlay","Android Auto","Heads-Up Display","360° Camera","Premium navigation","Wireless charging","Premium sound","Digital cockpit","Wi-Fi hotspot","Remote start","OTA updates","Voice control","Augmented reality nav","Matrix LED headlights"]
            },
            {
                key: "safety", label: "Safety", icon: "/icons/shield.png",
                suggestions: ["Lane keep assist","Blind spot monitor","Adaptive cruise control","Parking sensors","Auto emergency brake","Driver attention monitor","Night vision","Rear camera","Front camera","Cross-traffic alert","Evasive steering assist","Speed sign recognition","Fatigue alert","Hill descent control"]
            },
            {
                key: "performance", label: "Performance", icon: "/performance.png",
                suggestions: ["Sport package","Adaptive suspension","Sport exhaust","Launch control","Carbon ceramic brakes","Performance tires","Sport differential","Track mode","Air suspension","Active roll stabilization","Torque vectoring","Sport steering","Ceramic exhaust tips","Limited-slip differential"]
            },
        ]
    },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
    for (const item of SEED) {
        await Config.findOneAndUpdate(
            { key: item.key },
            { value: item.value },
            { upsert: true }
        );
        console.log(`✓ seeded: ${item.key}`);
    }
    console.log("Done.");
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});