import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryClient from './CategoryClient'

const categoryData: Record<string, { meta_title: string; meta_desc: string; h1: string; description: string }> = {
  "Electronics & Tech": {
    meta_title: "Produse de electronică & tehnologie de la vânzătorii din România | BigDiscounts",
    meta_desc: "Răsfoiește produse de electronică și tehnologie de la vânzătorii din România pe BigDiscounts. Contact direct, prețuri competitive, fără taxe pentru cumpărători.",
    h1: "Produse de electronică & tehnologie de la vânzătorii din România",
    description: "Descoperă o gamă variată de produse de electronică și tehnologie listate de vânzătorii din România pe BigDiscounts. De la gadgeturi și dispozitive smart home la calculatoare, accesorii și echipamente audio, categoria noastră de electronică conectează cumpărătorii direct cu afacerile din România care oferă prețuri competitive. Spre deosebire de platformele tradiționale de retail, BigDiscounts percepe vânzătorilor o taxă simplă de £1/lună cu zero comision, ceea ce înseamnă că beneficiezi de prețuri mai corecte și comunicare directă cu vânzătorul. Răsfoiește cele mai recente anunțuri tech, contactează vânzătorii direct și cumpără cu încredere de la afacerile din România."
  },
  "Phone & Accessories": {
    meta_title: "Telefoane & accesorii de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără accesorii pentru telefon și produse mobile de la vânzătorii din România pe BigDiscounts. Fără taxe pentru cumpărători, contact direct cu vânzătorii.",
    h1: "Telefoane & accesorii de la vânzătorii din România",
    description: "Găsește telefoane mobile, huse, încărcătoare, folii de protecție și tot felul de accesorii pentru telefon listate de vânzătorii din România pe BigDiscounts. Fie că ești în căutarea celor mai recente accesorii pentru smartphone sau piese de schimb, categoria noastră de Telefoane & Accesorii reunește afacerile din România care oferă vânzări directe fără comision de platformă. Cumpărătorii pot răsfoi anunțurile, compara prețurile și contacta vânzătorii direct — eliminând intermediarii și asigurând o achiziție transparentă și simplă. Toți vânzătorii de pe BigDiscounts sunt din România, oferindu-ți încredere în fiecare tranzacție."
  },
  "Clothing & Fashion": {
    meta_title: "Îmbrăcăminte & modă de la vânzătorii din România | BigDiscounts Marketplace",
    meta_desc: "Cumpără îmbrăcăminte și modă de la vânzătorii din România pe BigDiscounts. Branduri independente, contact direct, fără taxe pentru cumpărători.",
    h1: "Îmbrăcăminte & modă de la vânzătorii din România",
    description: "Răsfoiește îmbrăcăminte, modă și accesorii de la vânzătorii și afacerile din România pe BigDiscounts. De la elementele de bază din garderobă de zi cu zi la colecțiile sezoniere și stilurile unice, categoria noastră de Îmbrăcăminte & Modă prezintă anunțuri de la retailerii și brandurile din România care vând direct cumpărătorilor. BigDiscounts a fost creat pentru a sprijini vânzătorii din România de toate dimensiunile — de la mici etichete de modă la retaileri consacrați — oferind o taxă corectă de £1/lună fără comision. Cumpără direct, bucură-te de prețuri transparente și conectează-te cu vânzătorii de modă din România fără a plăti taxe de platformă umflate."
  },
  "Home & Living": {
    meta_title: "Produse pentru casă & locuință de la vânzătorii din România | BigDiscounts",
    meta_desc: "Descoperă produse pentru casă și locuință de la vânzătorii din România pe BigDiscounts. Mobilier, decorațiuni și articole de uz casnic la prețuri corecte.",
    h1: "Produse pentru casă & locuință de la vânzătorii din România",
    description: "Explorează decorațiuni, mobilier, articole de bucătărie, textile și articole de uz casnic de la vânzătorii din România pe BigDiscounts. Fie că reamenajezi o cameră sau cauți un articol specific, categoria noastră Casă & Locuință te conectează direct cu afacerile din România care oferă o gamă largă de produse la prețuri competitive. Vânzătorii de pe BigDiscounts păstrează 100% din fiecare vânzare, ceea ce înseamnă o valoare mai bună pentru cumpărători și o relație mai directă între tine și oamenii din spatele produselor. Răsfoiește anunțurile, pune întrebări direct și cumpără cu încredere."
  },
  "Garden & Outdoor": {
    meta_title: "Produse de grădină & exterior de la vânzătorii din România | BigDiscounts",
    meta_desc: "Răsfoiește produse de grădină și exterior de la vânzătorii din România pe BigDiscounts. Unelte, mobilier, plante și multe altele la prețuri corecte.",
    h1: "Produse de grădină & exterior de la vânzătorii din România",
    description: "Găsește unelte de grădină, mobilier de exterior, jardiniere, semințe, grătare și tot ce ai nevoie pentru spațiul tău în aer liber de la vânzătorii din România pe BigDiscounts. Categoria noastră Grădină & Exterior reunește afacerile din România care vând direct cumpărătorilor — fără adaosuri inutile, fără comision de platformă care să diminueze marjele vânzătorilor. Fie că ești un grădinar pasionat sau pur și simplu dorești să îmbunătățești spațiul tău exterior, BigDiscounts facilitează răsfoirea, compararea și contactarea directă a vânzătorilor. Toate anunțurile sunt de la vânzători din România dedicați comerțului corect și transparent."
  },
  "Pets": {
    meta_title: "Produse pentru animale de companie de la vânzătorii din România | BigDiscounts Marketplace",
    meta_desc: "Cumpără hrană, accesorii și articole pentru animale de companie de la vânzătorii din România pe BigDiscounts. Contact direct, fără taxe pentru cumpărători.",
    h1: "Produse pentru animale de companie de la vânzătorii din România",
    description: "Răsfoiește hrană pentru animale, recompense, jucării, accesorii, paturi și articole pentru câini, pisici, animale mici și multe altele de la vânzătorii din România pe BigDiscounts. Categoria noastră Animale de companie conectează proprietarii de animale direct cu afacerile și retailerii din România care oferă o gamă largă de produse la prețuri competitive. BigDiscounts a fost conceput pentru a sprijini vânzătorii din România de toate dimensiunile — ceea ce înseamnă că ai acces la produse de la afaceri care sunt cu adevărat pasionate de ceea ce vând. Contactează vânzătorii direct, pune întrebări despre produse și cumpără cu încrederea de a trata cu o afacere reală din România."
  },
  "Baby & Kids": {
    meta_title: "Produse pentru bebeluși & copii de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără produse pentru bebeluși și copii de la vânzătorii din România pe BigDiscounts. Haine, jucării, accesorii și multe altele la prețuri corecte.",
    h1: "Produse pentru bebeluși & copii de la vânzătorii din România",
    description: "Descoperă îmbrăcăminte, jucării, mobilier pentru camera copilului, accesorii și articole esențiale pentru bebeluși și copii de la vânzătorii din România pe BigDiscounts. Categoria noastră Bebeluși & Copii prezintă anunțuri de la afacerile din România care vând direct părinților și familiilor, fără comision de platformă care să umfle prețurile. BigDiscounts conectează cumpărătorii cu vânzătorii care sunt mândri de produsele pe care le oferă — oferindu-ți oportunitatea de a pune întrebări și a cumpăra direct de la sursă. Răsfoiește selecția noastră în creștere de produse pentru bebeluși și copii și sprijină afacerile din România în același timp."
  },
  "Health & Beauty": {
    meta_title: "Produse de sănătate & frumusețe de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără produse de sănătate și frumusețe de la vânzătorii din România pe BigDiscounts. Îngrijire piele, suplimente și multe altele la prețuri corecte.",
    h1: "Produse de sănătate & frumusețe de la vânzătorii din România",
    description: "Răsfoiește produse de îngrijire a pielii, îngrijire a părului, suplimente, vitamine, instrumente de frumusețe și produse de wellness de la vânzătorii din România pe BigDiscounts. Categoria noastră Sănătate & Frumusețe reunește afacerile din România care oferă o gamă largă de produse direct cumpărătorilor — eliminând intermediarii inutili și menținând prețurile corecte. Fie că ești în căutarea articolelor esențiale de zi cu zi sau produselor specializate de wellness, BigDiscounts facilitează găsirea, compararea și contactarea directă a vânzătorilor din România. Toate anunțurile provin de la afaceri din România dedicate prețurilor transparente și comunicării directe cu clienții lor."
  },
  "Toys & Games": {
    meta_title: "Jucării & jocuri de la vânzătorii din România | BigDiscounts Marketplace",
    meta_desc: "Cumpără jucării și jocuri de la vânzătorii din România pe BigDiscounts. Jocuri de societate, jucării de exterior și multe altele la prețuri competitive.",
    h1: "Jucării & jocuri de la vânzătorii din România",
    description: "Găsește jocuri de societate, jucării de exterior, jocuri educative, puzzle-uri, figurine de acțiune și multe altele de la vânzătorii din România pe BigDiscounts. Categoria noastră Jucării & Jocuri prezintă anunțuri de la afacerile din România care vând direct cumpărătorilor, fără comisioane care să mențină prețurile competitive. Fie că faci cumpărături pentru un cadou de ziua de naștere sau te aprovizionezi cu jocuri preferate pentru familie, BigDiscounts facilitează răsfoirea vânzătorilor de jucării din România, contactarea lor directă și cumpărarea cu încredere. Sprijină afacerile din România găsind valoare excelentă la jucării și jocuri pentru toate vârstele."
  },
  "Sports & Fitness": {
    meta_title: "Produse de sport & fitness de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără echipamente de sport și fitness de la vânzătorii din România pe BigDiscounts. Echipamente de sală, sport în aer liber și multe altele.",
    h1: "Produse de sport & fitness de la vânzătorii din România",
    description: "Răsfoiește echipamente de sală, accesorii fitness, îmbrăcăminte sport, echipamente outdoor și produse de wellness de la vânzătorii din România pe BigDiscounts. Categoria noastră Sport & Fitness conectează cumpărătorii direct cu afacerile din România care oferă prețuri competitive pentru o gamă largă de produse. De la echipamente de antrenament acasă la accesorii sportive specializate, BigDiscounts îți oferă acces la vânzători din România care sunt pasionați de ceea ce vând. Contactează vânzătorii direct, compară anunțurile și cumpără fără a plăti taxe de platformă umflate. Toți vânzătorii de pe BigDiscounts sunt din România."
  },
  "Food & Drink": {
    meta_title: "Produse alimentare & băuturi de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără alimente și băuturi de la vânzătorii din România pe BigDiscounts. Alimente de specialitate, băuturi și multe altele direct de la afacerile din România.",
    h1: "Produse alimentare & băuturi de la vânzătorii din România",
    description: "Descoperă alimente de specialitate, băuturi, gustări, condimente și produse artizanale de la vânzătorii și afacerile din România pe BigDiscounts. Categoria noastră Alimente & Băuturi reunește producătorii și retailerii din România care vând direct cumpărătorilor — fără comisioane și cu transparență totală a prețurilor. Fie că ești în căutarea produselor de bază sau a produselor unice de specialitate, BigDiscounts te conectează cu afacerile din România din domeniul alimentar dedicate calității și comerțului corect. Răsfoiește anunțurile, contactează vânzătorii direct și bucură-te de cumpărarea de la afaceri reale din România."
  },
  "Books & Stationery": {
    meta_title: "Cărți & papetărie de la vânzătorii din România | BigDiscounts Marketplace",
    meta_desc: "Cumpără cărți și papetărie de la vânzătorii din România pe BigDiscounts. Caiete, pixuri, cărți educative și multe altele.",
    h1: "Cărți & papetărie de la vânzătorii din România",
    description: "Răsfoiește cărți, caiete, pixuri, planificatoare, materiale de artă și produse de papetărie de la vânzătorii din România pe BigDiscounts. Categoria noastră Cărți & Papetărie prezintă anunțuri de la afacerile din România care vând direct cumpărătorilor la prețuri competitive. Fie că ești student, profesionist sau hobbyist, BigDiscounts facilitează găsirea papetăriei și materialelor de lectură de calitate de la vânzătorii din România care sunt pasionați de produsele lor. Contactează vânzătorii direct, compară opțiunile și cumpără fără taxe inutile. Toate anunțurile provin de la afaceri din România."
  },
  "Tools & DIY": {
    meta_title: "Unelte & bricolaj de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără unelte și materiale de bricolaj de la vânzătorii din România pe BigDiscounts. Scule electrice, unelte manuale și produse de îmbunătățire a locuinței.",
    h1: "Unelte & bricolaj de la vânzătorii din România",
    description: "Găsește scule electrice, unelte manuale, materiale de fixare, articole de îmbunătățire a locuinței și articole esențiale de bricolaj de la vânzătorii din România pe BigDiscounts. Categoria noastră Unelte & Bricolaj conectează cumpărătorii direct cu afacerile din România care oferă prețuri competitive pentru o gamă largă de produse. Fie că ești profesionist sau entuziast de bricolaj de weekend, BigDiscounts îți oferă acces la vânzătorii din România cu uneltele și materialele de care ai nevoie. Răsfoiește anunțurile, contactează vânzătorii direct și cumpără cu încredere de la afaceri reale din România dedicate prețurilor corecte și transparente."
  },
  "Automotive": {
    meta_title: "Produse auto de la vânzătorii din România | BigDiscounts Marketplace",
    meta_desc: "Cumpără accesorii auto, piese și produse automotive de la vânzătorii din România pe BigDiscounts. Contact direct, prețuri competitive.",
    h1: "Produse auto de la vânzătorii din România",
    description: "Răsfoiește accesorii auto, produse de curățare, piese de schimb, unelte și articole esențiale automotive de la vânzătorii din România pe BigDiscounts. Categoria noastră Auto reunește afacerile din România care vând direct cumpărătorilor — eliminând taxele inutile de platformă și menținând prețurile competitive. Fie că întreții vehiculul, actualizezi accesoriile sau cauți o piesă specifică, BigDiscounts facilitează găsirea vânzătorilor auto din România, compararea anunțurilor și contactarea lor directă. Toți vânzătorii sunt din România, oferindu-ți încredere în fiecare achiziție."
  },
  "Arts & Crafts": {
    meta_title: "Materiale de artă & meșteșuguri de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără materiale de artă și meșteșuguri de la vânzătorii din România pe BigDiscounts. Vopsele, țesături, unelte și multe altele la prețuri corecte.",
    h1: "Materiale de artă & meșteșuguri de la vânzătorii din România",
    description: "Descoperă vopsele, pânze, țesături, materiale de cusut, unelte de meșteșug și materiale creative de la vânzătorii din România pe BigDiscounts. Categoria noastră Arte & Meșteșuguri prezintă anunțuri de la afacerile și creatorii din România care vând direct cumpărătorilor, fără comisioane care să mențină prețurile corecte. Fie că ești artist profesionist, hobbyist sau cauți materiale pentru un proiect, BigDiscounts te conectează cu vânzătorii din România care își înțeleg produsele. Răsfoiește anunțurile, contactează vânzătorii direct și sprijină afacerile de artă și meșteșuguri din România."
  },
  "Office & Business": {
    meta_title: "Produse de birou & afaceri de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără articole de birou și afaceri de la vânzătorii din România pe BigDiscounts. Mobilier, papetărie, tehnologie și multe altele.",
    h1: "Produse de birou & afaceri de la vânzătorii din România",
    description: "Răsfoiește mobilier de birou, articole de birou, tehnologie și articole esențiale pentru locul de muncă de la vânzătorii din România pe BigDiscounts. Categoria noastră Birou & Afaceri conectează cumpărătorii direct cu afacerile din România care oferă prețuri competitive pentru produse destinate mediilor profesionale. Fie că echipezi un birou de acasă sau achiziționezi articole pentru un spațiu de lucru mai mare, BigDiscounts facilitează găsirea vânzătorilor din România, compararea anunțurilor și achiziționarea directă. Toți vânzătorii de pe BigDiscounts sunt din România, iar modelul nostru transparent de taxă de £1/lună înseamnă valoare mai bună pentru toți."
  },
  "Gifts & Seasonal": {
    meta_title: "Cadouri & produse sezoniere de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără cadouri și produse sezoniere de la vânzătorii din România pe BigDiscounts. Cadouri unice, decorațiuni și articole sezoniere.",
    h1: "Cadouri & produse sezoniere de la vânzătorii din România",
    description: "Găsește cadouri unice, decorațiuni sezoniere, produse pentru ocazii speciale și daruri cu gând de la vânzătorii din România pe BigDiscounts. Categoria noastră Cadouri & Sezoniere reunește afacerile din România care oferă o gamă largă de idei de cadouri pentru toate ocaziile — zile de naștere, Crăciun, aniversări și multe altele. BigDiscounts conectează cumpărătorii direct cu vânzătorii din România, permițând comunicare personală și tipul de serviciu pe care l-ai aștepta de la o afacere reală. Răsfoiește anunțurile, contactează vânzătorii direct și găsește cadoul perfect de la o afacere din România căreia îi pasă de clienții săi."
  },
  "Cleaning & Household": {
    meta_title: "Produse de curățenie & menaj de la vânzătorii din România | BigDiscounts",
    meta_desc: "Cumpără produse de curățenie și menaj de la vânzătorii din România pe BigDiscounts. Articole esențiale de zi cu zi la prețuri competitive.",
    h1: "Produse de curățenie & menaj de la vânzătorii din România",
    description: "Răsfoiește produse de curățenie, articole esențiale de menaj, produse de spălat și articole de întreținere a locuinței de la vânzătorii din România pe BigDiscounts. Categoria noastră Curățenie & Menaj prezintă anunțuri de la afacerile din România care vând direct cumpărătorilor la prețuri competitive. Fie că te aprovizionezi cu articole esențiale de zi cu zi sau cauți produse de curățenie specializate, BigDiscounts facilitează găsirea vânzătorilor din România, compararea opțiunilor și contactarea lor directă. Toți vânzătorii de pe BigDiscounts sunt din România, iar modelul nostru transparent de prețuri înseamnă că știi mereu exact ce plătești."
  },
  "Other": {
    meta_title: "Produse de la vânzătorii din România | BigDiscounts Marketplace",
    meta_desc: "Răsfoiește o gamă largă de produse de la vânzătorii din România pe BigDiscounts. Contact direct, fără taxe pentru cumpărători, prețuri transparente.",
    h1: "Produse de la vânzătorii din România pe BigDiscounts",
    description: "Explorează o varietate largă de produse de la vânzătorii și afacerile din România pe BigDiscounts. Marketplace-ul nostru sprijină vânzătorii de toate tipurile — de la specialiști de nișă la retaileri cu categorii multiple — oferind cumpărătorilor acces direct la afacerile din România la prețuri corecte și transparente. BigDiscounts percepe vânzătorilor o taxă simplă de £1/lună cu zero comision, ceea ce înseamnă valoare mai bună pentru cumpărători și o înțelegere mai corectă pentru vânzători. Răsfoiește toate anunțurile disponibile, contactează vânzătorii direct și descoperă ce au de oferit afacerile din România într-o gamă largă de categorii."
  }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: rawCategory } = await params
  const name = decodeURIComponent(rawCategory)
  const data = categoryData[name]
  if (!data) return { title: 'BigDiscounts' }
  return {
    title: data.meta_title,
    description: data.meta_desc,
    alternates: { canonical: `https://www.bigdiscounts.uk/browse/${encodeURIComponent(name)}` }
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryData).map(cat => ({ category: cat }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params
  const name = decodeURIComponent(rawCategory)
  const data = categoryData[name]
  if (!data) notFound()
  return <CategoryClient category={name} h1={data.h1} description={data.description} />
}
