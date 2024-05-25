import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor() { }

  region: {} = {
    "REGION I (ILOCOS)": [
      "ILOCOS NORTE",
    "ILOCOS SUR",
    "LA UNION",
    "PANGASINAN"
    ] ,
    "REGION II (CAGAYAN VALLEY)": [
      "BATANES",
    "CAGAYAN",
    "ISABELA",
    "NUEVA VIZCAYA",
    "QUIRINO"
    ],
    "REGION III (CENTRAL LUZON)": [
      "BATAAN",
    "BULACAN",
    "NUEVA ECIJA",
    "PAMPANGA",
    "TARLAC",
    "ZAMBALES",
    "AURORA"
    ],
    "REGION IV-A (CALABARZON)": [
      "BATANGAS",
    "CAVITE",
    "LAGUNA",
    "QUEZON",
    "RIZAL"
    ],
    "REGION IV-B (MIMAROPA)": [
      "MARINDUQUE",
    "OCCIDENTAL MINDORO",
    "ORIENTAL MINDORO",
    "PALAWAN",
    "ROMBLON"
    ],
    "REGION V (BICOL)": [
      "ALBAY",
      "CAMARINES NORTE",
      "CAMARINES SUR",
      "CATANDUANES",
      "MASBATE",
      "SORSOGON"
    ],
    "REGION VI (WESTERN VISAYAS)": [
      "AKLAN",
    "ANTIQUE",
    "CAPIZ",
    "ILOILO",
    "NEGROS OCCIDENTAL",
    "GUIMARAS",
    ],
    "REGION VII (CENTRAL VISAYAS)": [
      "BOHOL",
    "CEBU",
    "NEGROS ORIENTAL",
    "SIQUIJOR"
    ],
    "REGION VIII (EASTERN VISAYAS)": [
      "EASTERN SAMAR",
    "LEYTE",
    "NORTHERN SAMAR",
    "SAMAR (WESTERN SAMAR)",
    "SOUTHERN LEYTE",
    "BILIRAN"
    ],
    "REGION IX (ZAMBOANGA PENINSULA)": [
      "ZAMBOANGA DEL NORTE",
    "ZAMBOANGA DEL SUR",
    "ZAMBOANGA SIBUGAY",
    "CITY OF ISABELA"

    ],
    "REGION X (NORTHERN MINDANAO)": [
      "BUKIDNON",
      "CAMIGUIN",
      "LANAO DEL NORTE",
      "MISAMIS OCCIDENTAL",
      "MISAMIS ORIENTAL"
    ],
    "REGION XI (DAVAO)": [
      "DAVAO DEL NORTE",
      "DAVAO DEL SUR",
      "DAVAO ORIENTAL",
      "COMPOSTELA VALLEY",
      "DAVAO OCCIDENTAL"
    ],
    "REGION XII (SOCCSKSARGEN)": [
      "COTABATO (NORTH COTABATO)",
    "SOUTH COTABATO",
    "SULTAN KUDARAT",
    "SARANGANI",
    "COTABATO CITY"

    ],
    "NATIONAL CAPITAL REGION (NCR)": [
      "NCR, CITY OF MANILA, FIRST DISTRICT",
    "CITY OF MANILA",
    "NCR, SECOND DISTRICT",
    "NCR, THIRD DISTRICT",
    "NCR, FOURTH DISTRICT"

    ],
    "CORDILLERA ADMINISTRATIVE REGION (CAR)": [
      "ABRA",
    "BENGUET",
    "IFUGAO",
    "KALINGA",
    "MOUNTAIN PROVINCE",
    "APAYAO"

    ],
    "AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)": [
      "BASILAN",
    "LANAO DEL SUR",
    "MAGUINDANAO",
    "SULU",
    "TAWI-TAWI"

    ],
    "REGION XIII (Caraga)": [
      "AGUSAN DEL NORTE",
    "AGUSAN DEL SUR",
    "SURIGAO DEL NORTE",
    "SURIGAO DEL SUR",
    "DINAGAT ISLANDS"

    ]
    }

    municipalities = {
      "BOTOLAN": [
        "Bangan", "Batonlapoc", "Beneg", "Capayawan", "Carael", "Danacbunga",
        "Maguisguis", "Mambog", "Moraza", "Paco (Pob.)", "Panan", "Parel", "Paudpod",
        "Poonbato", "Porac", "San Isidro", "San Juan", "San Miguel", "Santiago",
        "Tampo (Pob.)", "Taugtog", "Villar", "Bancal", "Belbel", "Binuclutan",
        "Burgos", "Cabatuan", "Malomboy", "Nacolcol", "Owaog-Nibloc", "Palis"
      ],
      "CABANGAN": [
        "Anonang", "Apo-apo", "Arew", "Banuambayo (Pob.)", "Cadmang-Reserva",
        "Camiling (Camiing)", "Casabaan", "Dolores (Pob.)", "Del Carmen (Pob.)",
        "Laoag", "Lomboy", "Longos", "Mabanglit", "New San Juan", "San Antonio",
        "San Isidro", "San Juan (Pob.)", "San Rafael", "Santa Rita", "Santo Niño",
        "Tondo", "Felmida-Diaz"
      ],
      "CANDELARIA": [
        "Babancal", "Binabalian", "Catol", "Dampay", "Lauis", "Libertador",
        "Malabon (San Roque)", "Malimanga", "Pamibian", "Panayonan", "Pinagrealan",
        "Poblacion", "Sinabacan", "Taposo", "Uacon", "Yamot"
      ],
      "CASTILLEJOS": [
        "Balaybay", "Buenavista", "Del Pilar", "Looc", "Magsaysay", "Nagbayan",
        "Nagbunga", "San Agustin", "San Jose (Pob.)", "San Juan (Pob.)",
        "San Nicolas", "San Pablo (Pob.)", "San Roque", "Santa Maria"
      ],
      "IBA (Capital)": [
        "Amungan", "Zone 2 Pob. (Aypa)", "Zone 5 Pob. (Bano)", "Bangantalinga",
        "Zone 6 Pob. (Baytan)", "Zone 3 Pob. (Botlay)", "Dirita-Baloguen",
        "Zone 1 Pob. (Libaba)", "Lipay-Dingin-Panibuatan", "Palanginan (Palanguinan-Tambak)",
        "Zone 4 Pob. (Sagapan)", "San Agustin", "Santa Barbara", "Santo Rosario"
      ],
      "MASINLOC": [
        "Baloganon", "Bamban", "Bani", "Collat", "Inhobol", "North Poblacion",
        "San Lorenzo", "San Salvador", "Santa Rita", "Santo Rosario", "South Poblacion",
        "Taltal", "Tapuac"
      ],
      "OLONGAPO CITY": [
        "Asinan", "Banicain", "Barreto", "East Bajac-bajac", "East Tapinac",
        "Gordon Heights", "Kalaklan", "New Kalalake", "Mabayuan", "New Cabalan",
        "New Ilalim", "New Kababae", "Pag-asa", "Santa Rita", "West Bajac-bajac",
        "West Tapinac", "Old Cabalan"
      ],
      "PALAUIG": [
        "Alwa", "Bato", "Bulawen", "Cauyan", "Garreta", "Libaba", "Liozon", "Lipay",
        "Locloc", "Macarang", "Magalawa", "Pangolingan", "East Poblacion", "West Poblacion",
        "Salaza", "San Juan", "Santo Niño", "Santo Tomas", "Tition (San Vicente)"
      ],
      "SAN ANTONIO": [
        "Angeles", "Antipolo (Pob.)", "Burgos (Pob.)", "West Dirita", "East Dirita",
        "Luna (Pob.)", "Pundaquit", "San Esteban", "San Gregorio (Pob.)", "San Juan (Pob.)",
        "San Miguel", "San Nicolas (Pob.)", "Santiago", "Rizal"
      ],
      "SAN FELIPE": [
        "Amagna (Pob.)", "Apostol (Pob.)", "Balincaguing", "Farañal (Pob.)", "Feria (Pob.)",
        "Maloma", "Manglicmot (Pob.)", "Rosete (Pob.)", "San Rafael", "Santo Niño", "Sindol"
      ],
      "SAN MARCELINO": [
        "Aglao", "Buhawen", "Burgos (Pob.)", "Consuelo Norte", "Consuelo Sur (Pob.)",
        "La Paz (Pob.)", "Laoag", "Linasin", "Linusungan", "Lucero (Pob.)", "Nagbunga",
        "Rizal (Pob.)", "San Guillermo (Pob.)", "San Isidro (Pob.)", "San Rafael", "Santa Fe",
        "Central (Pob.)", "Rabanes"
      ],
      "SAN NARCISO": [
        "Alusiis", "Beddeng", "Candelaria (Pob.)", "Dallipawen", "Grullo", "La Paz",
        "Libertad (Pob.)", "Namatacan", "Natividad (Pob.)", "Paite", "Patrocinio (Pob.)",
        "San Jose (Pob.)", "San Juan (Pob.)", "San Pascual (Pob.)", "San Rafael (Pob.)",
        "Siminublan", "Omaya"
      ],
      "SANTA CRUZ": [
        "Babuyan", "Bolitoc", "Bangcol", "Bayto", "Biay", "Canaynayan", "Gama",
        "Guinabon", "Guisguis", "Lipay", "Lomboy", "Lucapon North", "Lucapon South",
        "Malabago", "Naulo", "Poblacion North", "Pagatpat", "Pamonoran", "Sabang",
        "San Fernando", "Poblacion South", "Tabalong", "Tubotubo North", "Tubotubo South",
        "Bulawon"
      ],
      "SUBIC": [
        "Aningway Sacatihan", "Asinan Poblacion", "Asinan Proper", "Baraca-Camachile (Pob.)",
        "Batiawan", "Calapacuan", "Calapandayan (Pob.)", "Cawag", "Ilwas (Pob.)",
        "Mangan-Vaca", "Matain", "Naugsol", "Pamatawan", "San Isidro", "Santo Tomas",
        "Wawandue (Pob.)"
      ]
    };

}
