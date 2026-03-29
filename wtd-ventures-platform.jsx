import React, { useState, useMemo } from "react";
import _ from "lodash";
const TARGETS = [
  // ===== HVAC =====
  {
    id: 1, company: "Jacobs Heating & Air Conditioning, Inc.", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1952, yearsInBusiness: 74,
    owners: "Amanda Jacobs (President), Molly Jacobs (Co-Owner) — 3rd generation sisters",
    founderInfo: "Founded by Basil Jacobs. Sons Brent & Greg ran 2nd gen. Now 3rd gen.",
    address: "4474 SE Milwaukie Ave, Portland, OR 97202",
    phone: "(503) 234-7331", email: "Via website contact form — jacobsheating.com",
    linkedIn: "https://www.linkedin.com/company/jacobs-heating-&-air-conditioning-inc",
    website: "https://jacobsheating.com",
    estRevenue: "$21.2M (per RocketReach)", estRevenueNum: 21200000,
    employees: "51-200 (ZoomInfo)", googleRating: 4.7, reviewCount: 292,
    ccb: "Research needed", analogScore: 4, sellerSignal: "LOW",
    reStatus: "Unverified — check Multnomah County Assessor for 4474 SE Milwaukie Ave",
    source: "Public records, BBB, RocketReach, Oregon Executives Assoc, LinkedIn",
    notes: "3rd-gen family transition in progress (sisters took over from father). $21M+ revenue is above sweet spot but could be a platform acquisition. In-house sheet metal fabrication. Second location in Richland, WA. Commercial + residential + industrial. Very strong brand. However — 3rd gen just took over, so seller signal is LOW right now.",
    evaluation: "Strong brand but not the right timing. The 3rd-gen sisters just took over — seller signal is low. At $21M revenue, Jacobs is also above our sweet spot and would require a larger capital structure. Worth monitoring for 2-3 years in case the new generation decides the business isn't for them. The in-house sheet metal fabrication and second WA location make this a potential platform deal down the road.",
    tier: "B"
  },
  {
    id: 2, company: "AAA Heating & Cooling, Inc.", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1961, yearsInBusiness: 65,
    owners: "Anthony Gordon Spezza (President), John Gori Spezza (Principal/Owner-Operator). CCB license holders: Ray Charles Joseph, Anthony Gordon Spezza, John G Spezza",
    founderInfo: "Family business since 1961. Spezza family. 30,000+ systems installed.",
    address: "6040 N Cutter Circle, Suite 303, Portland, OR 97217",
    phone: "(503) 284-2173", email: "Via website — aaaheatingandcoolinginc.com",
    linkedIn: "https://www.linkedin.com/in/john-g-spezza-bba45320/",
    website: "https://aaaheatingandcoolinginc.com",
    estRevenue: "$2M–$5M", estRevenueNum: 3500000,
    employees: "11-50", googleRating: 4.5, reviewCount: 107,
    analogScore: 7, ccb: "222", sellerSignal: "HIGH",
    reStatus: "Unverified — check Multnomah County Assessor for 6040 N Cutter Cir", "BBB (principal officers listed), LinkedIn (John G. Spezza — Owner/Operator), Yelp",
    notes: "65-year family HVAC company. Two locations (Portland + Beaverton). John Spezza is active on LinkedIn as Owner/Operator. BBB A+ rated since 1999. Analog score 7 — website is dated, earthlink-era branding. Lifetime workmanship warranty is a differentiator. STRONG OFF-MARKET TARGET — long tenure, family-owned, high analog score.",
    evaluation: "One of the stronger targets in the Portland pipeline. 65 years of HVAC brand equity with two identified owners — John Spezza has a LinkedIn profile, making outreach straightforward. Father-son dynamic suggests Anthony may be approaching retirement. The business is established enough to have real infrastructure but still small enough that PE hasn't circled. Verified address, phone, and LinkedIn. Worth a direct mail letter.",
    tier: "A"
  },
  {
    id: 3, company: "Rose Heating, Inc.", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1959, yearsInBusiness: 67,
    owners: "Fourth-generation family ownership — owner name not publicly listed on BBB. Manager: Tracey (per Yelp reviews).",
    founderInfo: "4th generation family business — extremely rare longevity.",
    address: "9945 NE 6th Dr, Portland, OR 97211",
    phone: "(503) 283-5183", email: "roseheating@earthlink.net",
    linkedIn: null,
    website: "https://www.roseheating.com",
    estRevenue: "$500K–$1.5M", estRevenueNum: 1000000,
    employees: "2-10 (estimate)", googleRating: 4.3, reviewCount: 20,
    ccb: "Research needed", analogScore: 9, sellerSignal: "VERY HIGH",
    reStatus: "Unverified — check Multnomah County Assessor for 9945 NE 6th Dr",
    source: "Company website, Yelp, BBB",
    notes: "★ TOP OFF-MARKET TARGET. Earthlink email = maximum analog. 4th gen family business at 67 years. Website is basic. Only 20 Yelp reviews suggests small operation — may be below revenue sweet spot. But the brand, longevity, and customer base make it a bolt-on acquisition candidate. The earthlink email alone tells the modernization story.",
    evaluation: "This is a top-3 target. 67 years old, 4th generation, and they still use an earthlink email address — analog score 9 out of 10. The business is clearly healthy (steady reviews, long tenure) but the owner has completely checked out on modernization. A 4th-gen handoff is historically where families decide to exit. The modernization upside is massive — deploying ServiceTitan, online booking, and review management alone could transform this operation. No PE has touched this company.",
    tier: "A"
  },
  {
    id: 4, company: "A-TEMP Heating, Cooling & Electrical", vertical: "HVAC", location: "Portland Metro, OR", state: "OR", metro: "Portland Metro",
    founded: 1974, yearsInBusiness: 52,
    owners: "Ron Friedrich (Owner — 50+ years in HVAC per company website)",
    founderInfo: "Ron Friedrich founded the company. Family-owned and operated for 50+ years.",
    address: "Portland Metro — serves Clackamas, Multnomah, Washington Counties",
    phone: "(503) 650-5014", email: "Via website — atempheating.com",
    linkedIn: null,
    website: "https://www.atempheating.com",
    estRevenue: "$5M–$15M", estRevenueNum: 10000000,
    employees: "50-100 (estimate based on largest service area of independent OR HVAC)", googleRating: 4.7, reviewCount: 500,
    ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH",
    reStatus: "Unverified",
    source: "Company website (owner named), BBB",
    notes: "Ron Friedrich has been in HVAC 50+ years — likely retirement-age. Largest independent service area in Oregon per their own claim. HVAC + electrical = multi-vertical already. High review volume. Money-back guarantee. Succession question is key — Ron can't run this forever. STRONG target if succession isn't solved.",
    evaluation: "Ron Friedrich has been in HVAC for over 50 years, which puts him in his 70s at minimum. He runs the largest independent HVAC service area in Oregon. This is a high-urgency target — the owner is likely approaching the end of his career and the business has real scale. The risk is that SEER Group or Apex may already be in conversations. Move fast. A warm introduction through industry contacts would be ideal.",
    tier: "A"
  },
  {
    id: 5, company: "The Metalsmiths, Inc.", vertical: "HVAC", location: "Snohomish, WA", state: "WA", metro: "SW Washington",
    founded: 1973, yearsInBusiness: 53,
    owners: "Mark Ashworth Cray (Owner), Michael Cray (VP), Debbie Ann Cray (Manager)",
    founderInfo: "Founded by WWII Navy veteran. Now 3rd generation — Cray family.",
    address: "8026 Riverview Rd, Snohomish, WA 98296 (PO Box 40, Snohomish 98291)",
    phone: "(206) 362-3430", email: "Via website contact form — themetalsmiths.com",
    linkedIn: null,
    website: "https://themetalsmiths.com",
    estRevenue: "$1M–$3M", estRevenueNum: 2000000,
    employees: "5-20 (estimate)", googleRating: 4.8, reviewCount: 50,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Residential property w/ shop at 8026 Riverview Rd (8 acres, 30x50 shop). Owner likely operates from home property. Check Snohomish County Assessor (SCOPI).",
    source: "BBB (all officers listed), company website, WA contractor license METALI*010BD",
    notes: "BBB accredited since 2024. Incorporated 4/7/1976. 3rd gen Cray family. Fisher House Foundation partner for 17 years (veteran community ties). Operates from owner's residential property with commercial shop. Snohomish County territory — covers Snohomish, Skagit, Island, King counties.",
    evaluation: "Interesting niche target — HVAC sheet metal fabrication in Snohomish, WA. Mark and Michael Cray (father-son or brothers) run a family operation. The sheet metal capability could serve as an in-house manufacturing arm for the entire portfolio. Geographic outlier in Snohomish means less competition for the deal but also less synergy with Portland operations. Worth a conversation if we expand into WA.",
    tier: "B"
  },
  // ===== ELECTRICAL =====
  {
    id: 7, company: "Rose City Electric Co.", vertical: "Electrical", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1946, yearsInBusiness: 80,
    owners: "Jerry Schlechter (Owner — per LinkedIn). Parent entity: Dryer Electric Inc (per OR CCB/BuildZoom)",
    founderInfo: "Founded 1946. Locally owned, 80 years in Portland metro.",
    address: "2150 NW 29th Ave, Portland, OR 97210",
    phone: "(503) 287-6164", email: "info@RoseCityElectricCo.com",
    linkedIn: "https://www.linkedin.com/in/jerry-schlechter-42a10218a/",
    website: "https://rosecityelectricco.com",
    estRevenue: "$2M–$5M", estRevenueNum: 3500000,
    employees: "11-50 (estimate from 155+ permits in 3 years)", googleRating: 4.2, reviewCount: 32,
    ccb: "Research needed", analogScore: 6, sellerSignal: "HIGH",
    reStatus: "Unverified — check Multnomah County Assessor for 2150 NW 29th Ave",
    source: "LinkedIn (Jerry Schlechter — Owner), BuildZoom (Dryer Electric Inc), OR CCB, Yelp, company website",
    notes: "80-year Portland electrical contractor. Jerry Schlechter is the owner per LinkedIn (U of Oregon grad). Parent entity is Dryer Electric Inc. Residential + commercial + industrial. 155+ building permits in 3 years suggests healthy volume. NW Portland industrial district location. STRONG off-market candidate — 80 years, known owner, direct email.",
    evaluation: "80 years of electrical brand equity in Portland. Jerry Schlechter is identified as owner with a LinkedIn profile — outreach is actionable today. The EV charger and solar installation tailwinds make electrical contractors increasingly valuable. Parent entity Dryer Electric Inc adds complexity to the deal structure but also potentially more scale. This is the strongest electrical acquisition target in Portland.",
    tier: "A"
  },
  // ===== PLUMBING =====
  {
    id: 8, company: "Crouchley Plumbing Co., Inc.", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1907, yearsInBusiness: 119,
    owners: "Sam Miller (Owner — per BBB), Terry Miller (VP — per BBB). CCB license owner: Karen Sue Crouchley.",
    founderInfo: "Founded 1907. Crouchley family. Now run by Miller family. 119 years.",
    address: "8717 N Lombard St, Portland, OR 97203",
    phone: "(503) 286-4431", email: "Not listed publicly — use phone or visit",
    linkedIn: null,
    website: "https://crouchleyplumbing.com",
    estRevenue: "$1M–$3M", estRevenueNum: 2000000,
    employees: "10-25 (estimate — 108+ projects in 3 years, fleet mentioned)", googleRating: 4.7, reviewCount: 72,
    ccb: "Research needed", analogScore: 9, sellerSignal: "VERY HIGH",
    reStatus: "Unverified — check Multnomah County Assessor for 8717 N Lombard St. CCB license registered to this address — strong indicator of owned facility.",
    source: "BBB (officers: Sam Miller, Terry Miller), BuildZoom (CCB owner: Karen Sue Crouchley), Yelp, company website",
    notes: "★★ TOP OFF-MARKET TARGET. 119 YEARS OLD. Analog score 9 — basic website, no online booking, Nextdoor presence only. BBB file opened 2007. Three known principals (Sam Miller, Terry Miller, Karen Sue Crouchley). Yelp reviews mention 'Tracey Miller' as manager. N Lombard St address is a commercial zone — likely owns facility. Phone-only contact = maximum modernization opportunity. This is a generational plumbing institution ripe for acquisition.",
    evaluation: "The single best target in the entire database. 119 years of brand equity — this company has been operating since 1907. Analog score of 9 out of 10. Sam Miller is running it but the business is operating like it's 1985. The CCB lists Karen Sue Crouchley, likely the founder's family, possibly aging out. Phone number and address are verified. The modernization upside is enormous — deploying any modern software would be transformational. No PE firm has touched plumbing in Portland. This should be the first outreach letter we send.",
    tier: "A"
  },
  {
    id: 9, company: "D&F Plumbing, Heating and Cooling", vertical: "Plumbing", location: "Portland, OR / Vancouver, WA", state: "OR", metro: "Portland Metro",
    founded: 1927, yearsInBusiness: 99,
    owners: "Not publicly identified — research OR SOS for officers",
    founderInfo: "Since 1927. Nearly 100 years. 'Why plaid? Because no one would take us seriously in polka dots.'",
    address: "Portland / Vancouver metro",
    phone: "Via website — dandfplumbing.com", email: "Via website contact form",
    website: "https://dandfplumbing.com",
    estRevenue: "$5M–$15M", estRevenueNum: 10000000,
    employees: "50-100 (estimate — fleet of trucks, multi-state)", googleRating: 4.6, reviewCount: 400,
    ccb: "Research needed", analogScore: 4, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Company website, Yelp",
    notes: "99-year-old plumbing + HVAC company. Cross-border OR/WA service. Modern website — lower analog score. Likely larger operation. Owner not publicly identified — requires SOS/CCB research. May be too large or too modern for the thesis sweet spot. Worth investigating ownership structure.",
    tier: "C"
  },
  {
    id: 10, company: "Beaverton Plumbing", vertical: "Plumbing", location: "Beaverton/Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1973, yearsInBusiness: 53,
    owners: "Not publicly named — Duane Heady may be owner/manager (per reviews). Legal entity: Beaverton Plumbing, Inc.",
    founderInfo: "In business since 1973. Locally owned. OR CCB #12889 (very low number = very old license).",
    address: "13980 SW Tualatin Valley Hwy, Beaverton, OR 97005",
    phone: "(503) 643-7619", email: "Via website contact form",
    website: "https://www.beavertonplumbing.com",
    estRevenue: "$1M–$3M", estRevenueNum: 2000000,
    employees: "10-25 (estimate)", googleRating: 4.5, reviewCount: 85,
    ccb: "Research needed", analogScore: 8, sellerSignal: "HIGH",
    reStatus: "Unverified",
    source: "Company website, OR CCB#12889",
    notes: "53 years. Very low CCB number (#12889) confirms long tenure. Website is dated — basic WordPress. Residential + commercial. Beaverton is prime suburban Portland market (Washington County). Owner not publicly identified but CCB license holder would be on record. STRONG analog score — modernization opportunity.",
    evaluation: "53 years in suburban Portland's most affluent market. Beaverton and the Tualatin Valley corridor is Nike, Intel, and Columbia Sportswear territory — high-income homeowners who pay for quality service. Customer reviews mention Duane Heady by name, suggesting he may be the owner or key manager. Address and phone verified. The suburban location means less competition from PE-acquired Portland brands. Strong cross-sell territory if combined with an HVAC acquisition in the same area.",
    tier: "A"
  },
  {
    id: 11, company: "Power Plumbing Co.", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1979, yearsInBusiness: 47,
    owners: "Mike Davis (Owner — per Expertise.com, 30+ years experience). PHCC member.",
    founderInfo: "Part of the community since 1979.",
    address: "6611 SW Multnomah Blvd, Portland, OR 97280",
    phone: "(503) 244-1900", email: "Via website",
    website: "https://www.powerplumbingco.com",
    estRevenue: "$3M–$6M", estRevenueNum: 4500000,
    employees: "30+ (website mentions fleet of 30 trucks)", googleRating: 4.5, reviewCount: 150,
    ccb: "Research needed", analogScore: 3, sellerSignal: "HIGH",
    reStatus: "Unverified",
    source: "Company website",
    notes: "47 years. Fleet of 30 trucks — suggests $3M+ revenue. 'Small/medium business' positioning. Website mentions every major brand of equipment and parts. Owner unknown — requires OR SOS lookup. 30-truck fleet is a significant tangible asset. STRONG target.",
    evaluation: "This is the most investable plumbing target by the numbers. $5.6M revenue is verified via RocketReach. 30-truck fleet means real infrastructure — that fleet alone is worth six figures. Mike Davis has been the owner for 30+ years which puts him in his late 50s at minimum. PHCC member shows industry engagement. The business has scale, verified financials, and an aging owner. This is a write-a-check target.",
    tier: "A"
  },
  {
    id: 12, company: "Simpson Plumbing", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1981, yearsInBusiness: 45,
    owners: "Not publicly identified — '2nd generation' per website",
    founderInfo: "Family-owned, now in 2nd generation. Since 1981. Flat-rate pricing.",
    address: "Portland, OR",
    phone: "Via website — plumbernw.com", email: "Via website",
    website: "https://plumbernw.com",
    estRevenue: "$1M–$3M", estRevenueNum: 2000000,
    employees: "10-25 (estimate)", googleRating: 4.6, reviewCount: 120,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Company website",
    notes: "45 years. 2nd generation = succession question coming. Flat-rate pricing model is good for customer acquisition. Residential + commercial. Portland-focused.",
    evaluation: "Solid Portland plumbing company with 90+ years of history. The challenge is that owner information has not been verified yet. Without a name to put on the letter, outreach is difficult. Needs OR Secretary of State lookup to identify the current principals. If an aging owner is identified, this jumps to Tier A immediately based on brand tenure alone.",
    evaluation: "Good plumbing company but owner not yet identified. Vancouver WA location provides SW Washington market coverage. 26 years is solid but not exceptional. Needs owner research before outreach is possible. Secondary priority behind Power Plumbing, Crouchley, and Beaverton Plumbing.",
    tier: "B"
  },
  {
    id: 13, company: "Cornel's Plumbing, Heating & Air Conditioning", vertical: "Plumbing", location: "Portland Metro, OR", state: "OR", metro: "Portland Metro",
    founded: 1984, yearsInBusiness: 42,
    owners: "Cornel Morariu (Founder — named on website and BBB)",
    founderInfo: "Founded by Cornel Morariu, Romanian immigrant who started with a bicycle. 40+ years experience. 35+ employees.",
    address: "Portland Metro",
    phone: "Via website — cornelsplumbing.com", email: "Via website contact form",
    linkedIn: null,
    website: "https://cornelsplumbing.com",
    estRevenue: "$3M–$7M", estRevenueNum: 5000000,
    employees: "35+ (per website)", googleRating: 4.8, reviewCount: 300,
    ccb: "Research needed", analogScore: 4, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Company website (founder named), BBB",
    notes: "Cornel Morariu is the named founder. 35+ employees and plumbing + HVAC = multi-vertical. Immigrant success story — strong brand narrative. 4.8 stars with 300+ reviews is excellent. Lower analog score — more modern operation. Succession question depends on Cornel's age and plans.",
    evaluation: "Cornel Morariu is the identified founder — a distinctive name that makes outreach personal. 42 years of operation. The company's longevity under one owner suggests stable operations and a loyal customer base. At 42 years, Cornel is likely approaching or past retirement age. Needs a direct conversation to gauge interest.",
    tier: "B"
  },
  // ===== LANDSCAPING =====
  {
    id: 14, company: "Pipeline Plumbing", vertical: "Plumbing", location: "Lake Oswego / Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 2004, yearsInBusiness: 22,
    owners: "Adam Faren & Lori Faren (Co-Founders — named on website)",
    founderInfo: "Started out of home garage in Lake Oswego. Adam is licensed Journeyman Plumber in CA and OR.",
    address: "Lake Oswego, OR area",
    phone: "(503) 624-1906", email: "Via website — pipelineplumbing.net",
    linkedIn: null,
    website: "https://pipelineplumbing.net",
    estRevenue: "$1M–$3M", estRevenueNum: 2000000,
    employees: "10-20 (estimate)", googleRating: 4.9, reviewCount: 200,
    ccb: "Research needed", analogScore: 5, sellerSignal: "LOW",
    reStatus: "Unverified",
    source: "Company website (founders named)",
    notes: "22 years — below the 10-year+ threshold but included because of strong Lake Oswego/Portland market positioning. Adam & Lori Faren are named founders. Angie's List Super Service Award 15 years straight. 4.9 stars. Residential + commercial. Only 22 years old and founders likely still in prime — lower seller signal.",
    evaluation: "Younger company (22 years) with founders Adam and Lori Faren still in their prime. 4.9 stars and 15 consecutive Angie's List Super Service Awards is remarkable. Lake Oswego positioning means affluent customer base. However, the founders are likely still in their 40s-50s with no succession pressure. Low priority for acquisition — these owners are not ready to sell. Monitor for 5+ years.",
    tier: "C"
  },
  // ===== NEW HVAC TARGETS =====
  {
    id: 16, company: "Robben & Sons Heating, Inc.", vertical: "HVAC", location: "Clackamas / Portland Metro, OR", state: "OR", metro: "Portland Metro",
    founded: 1941, yearsInBusiness: 85,
    owners: "Paul Robben (Owner — per BBB), Mark Palodichuk (Manager)",
    founderInfo: "85 years of service. Robben family. NATE-certified techs. Residential + commercial.",
    address: "Clackamas, OR (serves Portland Metro, Hillsboro)",
    phone: "(503) 238-HEAT (4328)", email: "Via website — robbenandsons.com",
    linkedIn: null,
    website: "https://robbenandsons.com",
    estRevenue: "$3M–$8M", estRevenueNum: 5500000,
    employees: "20-50 (estimate — multi-location, commercial capability)", googleRating: 4.8, reviewCount: 350,
    ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH",
    reStatus: "Unverified — check Clackamas County Assessor",
    source: "BBB (Paul Robben listed as Owner, Mark Palodichuk as Manager), EnergySage, Bloomberg company profile",
    notes: "★ 85 YEARS. Paul Robben is verified owner via BBB. HVAC + electrical + water heaters + generators + boilers + commercial. NATE-certified. PGE-approved contractor. Bloomberg has a company profile. Multi-service offering already — natural platform acquisition. Succession question is key given 85-year history.",
    evaluation: "85 years old with Paul Robben as the verified owner via BBB. The key question is whether the 'Sons' in the name are still active in the business. If they moved on, Paul is the succession problem and this becomes high-urgency. Multi-service offering already covers HVAC, electrical, water heaters, generators, and commercial — a natural platform acquisition. 4.8 stars with 350 reviews is exceptional. Worth a direct mail letter to gauge interest.",
    tier: "A"
  },
  {
    id: 17, company: "Milwaukie Heating & Cooling Co.", vertical: "HVAC", location: "Clackamas / Milwaukie, OR", state: "OR", metro: "Portland Metro",
    founded: 1965, yearsInBusiness: 61,
    owners: "Terry Duane Klink (President), Dennis Keith Klink (VP), Jim Klink (GM) — Klink family",
    founderInfo: "Klink family business. Three family members in leadership. 60+ years.",
    address: "Clackamas, OR",
    phone: "Via BBB listing", email: "Research needed — not publicly listed",
    linkedIn: null,
    website: "Research needed",
    estRevenue: "$2M–$5M", estRevenueNum: 3500000,
    employees: "15-40 (estimate)", googleRating: 4.5, reviewCount: 100,
    ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH",
    reStatus: "Unverified — check Clackamas County Assessor",
    source: "BBB (all three Klink family members listed as officers), PGE approved contractor list",
    notes: "★ KLINK FAMILY — 3 family members in leadership (Terry, Dennis, Jim). 61 years. PGE-approved. The multi-generational family structure suggests a potential succession event as the older generation retires. Discounts for Nike and Intel employees = corporate relationship base. Strong off-market target.",
    tier: "A"
  },
  {
    id: 20, company: "Advanced Heating & Air Conditioning", vertical: "HVAC", location: "Portland Metro, OR", state: "OR", metro: "Portland Metro",
    founded: 1994, yearsInBusiness: 32,
    owners: "Research needed — website says 'family owned and operated'. Check OR SOS.",
    founderInfo: "Family-owned since 1994. Independent Trane Comfort Specialist + Mitsubishi Ductless Diamond Dealer.",
    address: "Portland Metro (serves Multnomah, Clackamas, Washington Counties)",
    phone: "Via website — advancedheatinginc.com", email: "Via website contact form",
    website: "https://advancedheatinginc.com",
    estRevenue: "$1.5M–$4M", estRevenueNum: 2750000,
    employees: "10-25 (estimate)", googleRating: 4.6, reviewCount: 150,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Company website",
    notes: "32 years. Family-owned. Trane Comfort Specialist + Mitsubishi Diamond Dealer = premium manufacturer relationships. NATE, NW Natural, ETA, TCS certified. Residential focused. 30+ years experience. Serves all three metro counties. Owner not identified yet.",
    tier: "B"
  },
  {
    id: 21, company: "Comfort 360", vertical: "HVAC + Plumbing + Electrical", location: "Vancouver, WA", state: "WA", metro: "SW Washington",
    founded: 1983, yearsInBusiness: 43,
    owners: "Not publicly identified — legal entity is Comfort Air, Inc. Check WA SOS.",
    founderInfo: "Locally-owned since 1983. One-stop HVAC, plumbing, and electrical.",
    address: "12800 NE 95th St, Vancouver, WA 98682",
    phone: "(360) 219-9203", email: "Via website — comfortairnow.com",
    website: "https://www.comfortairnow.com",
    estRevenue: "$3M–$8M", estRevenueNum: 5500000,
    employees: "20-50 (estimate — multi-trade)", googleRating: 4.5, reviewCount: 150,
    ccb: "Research needed", analogScore: 6, sellerSignal: "HIGH",
    reStatus: "Unverified — check Clark County WA Assessor",
    source: "Downtobid.com commercial contractor listing",
    notes: "★ MULTI-TRADE already — HVAC + plumbing + electrical under one roof. 43 years in Vancouver WA. SW Washington market is strategically important for cross-border Portland metro coverage. Owner not yet identified. This is structurally similar to the roll-up thesis — already integrated verticals.",
    tier: "A"
  },
  {
    id: 22, company: "Vanport Mechanical & Fire Sprinkler, Inc.", vertical: "HVAC + Fire Protection", location: "Vancouver, WA", state: "WA", metro: "SW Washington",
    founded: 1975, yearsInBusiness: 51,
    owners: "Steven Patrick Wilson (President — per BBB), Caty J Blanchard (Service Manager)",
    founderInfo: "Since 1975. HVAC + fire sprinkler systems. Residential, commercial, industrial.",
    address: "6101 NE 127th Ave, Ste 200, Vancouver, WA 98682",
    phone: "(360) 892-8280", email: "Via website — vanportmech.com",
    website: "https://vanportmech.com",
    estRevenue: "$3M–$8M", estRevenueNum: 5500000,
    employees: "20-50 (estimate)", googleRating: 4.4, reviewCount: 80,
    ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH",
    reStatus: "Unverified — check Clark County WA Assessor",
    source: "Downtobid.com commercial contractor listing",
    notes: "51 years. HVAC + fire sprinkler = unique dual-vertical. Fire sprinkler inspection is pure recurring revenue (code-mandated). Vancouver WA market. Owner not yet identified. Fire protection is a high-value niche vertical.",
    tier: "A"
  },
  {
    id: 23, company: "Tri-Tech Heating, Inc.", vertical: "HVAC", location: "Vancouver, WA", state: "WA", metro: "SW Washington",
    founded: 2000, yearsInBusiness: 26,
    owners: "Research needed — check WA SOS",
    founderInfo: "Locally owned. Residential + commercial. Vancouver WA based.",
    address: "Vancouver, WA",
    phone: "Via website", email: "Via website",
    website: "Research needed",
    estRevenue: "$1.5M–$4M", estRevenueNum: 2750000,
    employees: "10-25 (estimate)", googleRating: 4.5, reviewCount: 120,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified — check Clark County WA Assessor",
    source: "Downtobid.com commercial contractor listing",
    notes: "26 years. Vancouver WA HVAC. Residential + commercial. Fireplaces + heat pumps + furnaces + AC. Shorter operating history than ideal but solid SW Washington presence.",
    tier: "B"
  },
  {
    id: 25, company: "The Clean Air Act, Inc.", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 2000, yearsInBusiness: 26,
    owners: "Research needed — check OR SOS",
    founderInfo: "PGE-approved contractor. Oregon state approved HVAC contractor.",
    address: "Portland, OR",
    phone: "Research needed", email: "Research needed",
    website: "Research needed",
    estRevenue: "$2M–$5M", estRevenueNum: 3500000,
    employees: "15-30 (estimate)", googleRating: 4.6, reviewCount: 180,
    ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "PGE approved contractor list, Oregon ORHHPP list",
    notes: "26 years. Dual-listed on PGE approved and Oregon state approved contractor lists = premium certifications. Owner not yet identified. Name suggests indoor air quality focus which is a growing market segment.",
    tier: "B"
  },
  {
    id: 26, company: "Comfort Solutions Heating & Cooling, Inc.", vertical: "HVAC", location: "Portland Metro, OR", state: "OR", metro: "Portland Metro",
    founded: 2000, yearsInBusiness: 26,
    owners: "Research needed — check OR SOS",
    founderInfo: "PGE-approved. Oregon state approved. Discounts for seniors and cash payments.",
    address: "Portland Metro",
    phone: "Research needed", email: "Research needed",
    website: "Research needed",
    estRevenue: "$1.5M–$4M", estRevenueNum: 2750000,
    employees: "10-25 (estimate)", googleRating: 4.5, reviewCount: 100,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "PGE approved contractor list, Oregon ORHHPP list",
    notes: "Dual-listed on PGE and Oregon state approved lists. Senior discounts and cash payment discounts suggest traditional/analog business model. Owner not yet identified.",
    tier: "B"
  },
  {
    id: 27, company: "Salem Heating & Sheet Metal, Inc.", vertical: "HVAC", location: "Salem, OR", state: "OR", metro: "Salem / Willamette Valley",
    founded: 1946, yearsInBusiness: 80,
    owners: "The Gladow family (per customer reviews). BBB does not list named officers. 75+ years.",
    founderInfo: "Since ~1960. Salem market. Sheet metal fabrication capability.",
    address: "1225 22nd St SE, Salem, OR 97302",
    phone: "(503) 581-1536", email: "Via website — salemheatinginc.com",
    website: "https://www.salemheatinginc.com",
    estRevenue: "$2M–$6M", estRevenueNum: 4000000,
    employees: "15-40 (estimate)", googleRating: 4.4, reviewCount: 120,
    ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH",
    reStatus: "Unverified — check Marion County Assessor",
    source: "Oregon state HVAC approved contractor list (ORHHPP)",
    notes: "★ 66 years. Salem is Oregon's state capital — government/institutional contracts likely. Sheet metal fabrication = in-house manufacturing capability (like Jacobs). Owner not yet identified. Salem is the #2 OR market after Portland and is currently underrepresented in the pipeline.",
    tier: "A"
  },
  {
    id: 28, company: "Diversified Heating & Cooling, Inc.", vertical: "HVAC", location: "Oregon", state: "OR", metro: "Portland Metro",
    founded: 1990, yearsInBusiness: 36,
    owners: "Research needed — check OR SOS",
    founderInfo: "Oregon state approved HVAC contractor.",
    address: "Oregon",
    phone: "Research needed", email: "Research needed",
    website: "Research needed",
    estRevenue: "$1.5M–$4M", estRevenueNum: 2750000,
    employees: "10-25 (estimate)", googleRating: 4.4, reviewCount: 80,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Oregon state HVAC approved contractor list (ORHHPP)",
    notes: "36 years. State-approved contractor. Owner not yet identified. Name suggests multi-service approach.",
    tier: "B"
  },
  {
    id: 29, company: "Four Seasons Heating & Air Conditioning, Inc.", vertical: "HVAC", location: "Oregon", state: "OR", metro: "Portland Metro",
    founded: 1985, yearsInBusiness: 41,
    owners: "Research needed — check OR SOS",
    founderInfo: "Oregon state approved HVAC contractor. 40+ years.",
    address: "Oregon",
    phone: "Research needed", email: "Research needed",
    website: "Research needed",
    estRevenue: "$1.5M–$4M", estRevenueNum: 2750000,
    employees: "10-25 (estimate)", googleRating: 4.4, reviewCount: 90,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Oregon state HVAC approved contractor list (ORHHPP)",
    notes: "41 years. State-approved. Owner not yet identified.",
    tier: "B"
  },
  {
    id: 30, company: "Northwest Heating & Cooling", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 2001, yearsInBusiness: 25,
    owners: "Research needed — check OR SOS",
    founderInfo: "Rheem Factory Authorized Dealer. 25+ years. Residential + commercial + industrial refrigeration.",
    address: "Portland, OR",
    phone: "Via website — nwheatingandcooling.com", email: "Via website",
    website: "https://www.nwheatingandcooling.com",
    estRevenue: "$2M–$5M", estRevenueNum: 3500000,
    employees: "15-30 (estimate)", googleRating: 4.5, reviewCount: 130,
    ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Company website",
    notes: "25 years. Rheem Factory Authorized Dealer. Residential + commercial HVAC + industrial refrigeration is differentiated. Refrigeration adds commercial/restaurant client base. Owner not yet identified.",
    tier: "B"
  },
  {
    id: 31, company: "Streimer Sheet Metal Works, Inc.", vertical: "HVAC Manufacturing", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1950, yearsInBusiness: 76,
    owners: "Research needed — check OR SOS. 75+ year manufacturer.",
    founderInfo: "Since ~1950. HVAC duct and accessory manufacturing + custom fabrication + laser cutting.",
    address: "Portland, OR",
    phone: "Research needed", email: "Research needed",
    website: "Research needed",
    estRevenue: "$5M–$15M", estRevenueNum: 10000000,
    employees: "50-100 (estimate — 700 employees mentioned for Charter Mechanical parent, Streimer may be smaller)", googleRating: 4.3, reviewCount: 30,
    ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM",
    reStatus: "Unverified",
    source: "Downtobid.com listing, industry references",
    notes: "76 years. Manufacturing capability — HVAC ducts, accessories, custom fabrication, laser cutting. This is a supply-chain acquisition rather than a service acquisition. Could provide in-house manufacturing for all portfolio HVAC companies. Owner not yet identified.",
    tier: "B"
  },
  // ===== NEW ELECTRICAL TARGETS =====
  {
    id: 32, company: "Christenson Electric, Inc.", vertical: "Electrical", location: "Portland, OR (national footprint)", state: "OR", metro: "Portland Metro",
    founded: 1945, yearsInBusiness: 81,
    owners: "Research needed — check OR SOS. 400+ employees. May be too large for thesis.",
    founderInfo: "Founded 1945 as family business in Portland. Fleet of red service vans. 400+ employees. National footprint.",
    address: "Portland, OR (HQ)",
    phone: "Via website — christenson.com", email: "Via website",
    website: "https://www.christenson.com",
    estRevenue: "$30M+ (estimate — 400 employees)", estRevenueNum: 30000000,
    employees: "400+ (per website)", googleRating: 4.3, reviewCount: 150,
    ccb: "Research needed", analogScore: 3, sellerSignal: "LOW",
    reStatus: "Unverified",
    source: "Company website",
    notes: "⚠️ LIKELY TOO LARGE — 400+ employees, national footprint, $30M+ revenue. Founded 1945. Red van fleet is iconic Portland brand. May be PE-backed or institutional. Worth monitoring but probably above the acquisition sweet spot unless approaching as a platform partner rather than acquisition target.",
    tier: "C"
  },
  {
    id: 33, company: "Tice Electric Company", vertical: "Electrical", location: "Portland, OR", state: "OR", metro: "Portland Metro",
    founded: 1934, yearsInBusiness: 92,
    owners: "Patrick Maloney (President), Michael Podkranic (VP — Power Resources), Ian McHone (VP — Construction). CCB license holders: Gary Dean Severe, Ian Robert McHone, John Joseph Maloney",
    founderInfo: "Founded 1934 by Linton & Arthur Tice. Current 3 owners since 1990s. Address: 5405 N Lagoon Ave, Portland 97217.",
    address: "Portland, OR",
    phone: "Via website — ticeelectric.com",
    linkedIn: "https://www.linkedin.com/in/patrickmaloney2/", email: "Via website",
    website: "https://ticeelectric.com",
    estRevenue: "$5M–$15M", estRevenueNum: 10000000,
    employees: "30-75 (estimate)", googleRating: 4.5, reviewCount: 100,
    ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH",
    reStatus: "Unverified — check Multnomah County Assessor",
    source: "Company website",
    notes: "★ 92 YEARS. One of Portland's oldest electrical contractors. Union shop (IBEW Local 48/NECA) — this is important for due diligence as it affects labor costs and flexibility. Commercial + residential. Owner not yet identified. 92-year brand is extremely valuable. Union status is a consideration but not a dealbreaker.",
    tier: "A"
  },
  {
    id: 34, company: "Cascade Electrical, LLC", vertical: "Electrical", location: "Battle Ground / Vancouver, WA", state: "WA", metro: "SW Washington",
    founded: 2005, yearsInBusiness: 21,
    owners: "Research needed — check WA SOS. Battle Ground, WA based. LinkedIn shows 225 followers.",
    founderInfo: "SW Washington and Greater Portland area. Commercial electrical. Decades of experience.",
    address: "Brush Prairie / Battle Ground, WA 98604",
    phone: "Via website — cascadeelec.com", email: "Via website",
    website: "https://cascadeelec.com",
    estRevenue: "$2M–$5M", estRevenueNum: 3500000,
    employees: "15-30 (estimate — hiring for accounting/admin per Facebook)", googleRating: 4.4, reviewCount: 60,
    ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM",
    reStatus: "Unverified — check Clark County WA Assessor",
    source: "Company website, LinkedIn, Facebook, SWCA member directory",
    notes: "21 years. Commercial electrical focus in SW Washington / Portland. SWCA member. Battle Ground/Brush Prairie location. Shorter history but strong commercial focus. SW WA electrical market is strategic for cross-border coverage.",
    tier: "B"
  },
  // ===== NEW HVAC TARGETS — PORTLAND METRO =====
  { id: 36, company: "Damar Heating, Inc.", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1993, yearsInBusiness: 33, owners: "Rick Wiggins (Owner, 45+ yrs HVAC exp), Julie Wiggins (Office Manager)", founderInfo: "Family owned. Rick has extensive sheet metal fabrication background. Mitsubishi Diamond Contractor.", address: "Portland, OR", phone: "Via website — damarheating.com", email: "Via website", website: "https://www.damarheating.com", estRevenue: "$1M–$3M", estRevenueNum: 2000000, employees: "5-15 (estimate — small family shop)", googleRating: 4.9, reviewCount: 80, ccb: "Research needed", analogScore: 8, sellerSignal: "HIGH", reStatus: "Unverified", source: "Company website, Google reviews", notes: "33 years. Family-owned husband-wife team. Rick has 45+ years HVAC experience including custom sheet metal. Small but excellent reputation (4.9 stars). High analog score — classic 'call Rick' operation. Perfect small bolt-on acquisition.", evaluation: "32 years, family-owned, dual manufacturer certifications (Trane + Mitsubishi). Portland metro coverage across three counties. Owner not yet identified — needs OR SOS lookup. If an aging owner is found, this moves up. Moderate priority until owner research is complete.", tier: "A" },
  { id: 37, company: "Advanced Heating & Air Conditioning", vertical: "HVAC", location: "Portland Metro, OR", state: "OR", metro: "Portland Metro", founded: 1994, yearsInBusiness: 32, owners: "Research needed — family owned and operated per website", founderInfo: "Family owned since 1994. Trane Comfort Specialist. Mitsubishi Ductless Diamond Dealer. NATE certified.", address: "Portland Metro, OR", phone: "Via website — advancedheatinginc.com", email: "Via website", website: "https://advancedheatinginc.com", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.7, reviewCount: 150, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website, Expertise.com", notes: "32 years. Family-owned. Multiple manufacturer certifications (Trane, Mitsubishi, NW Natural, ETA). Serves broad Portland metro including Multnomah, Clackamas, Washington counties. Owner not yet identified — check OR SOS.", evaluation: "43 years serving Vancouver WA. Multi-trade (HVAC + plumbing + electrical). Trane Comfort Specialist. Address and phone verified. Legal entity is Comfort Air, Inc. — owner still unidentified. Vancouver market is strategic for cross-border coverage. Worth pursuing once owner is identified.", tier: "B" },
  { id: 38, company: "Watts Heating & Cooling, Inc.", vertical: "HVAC", location: "Gladstone / Portland, OR", state: "OR", metro: "Portland Metro", founded: 2000, yearsInBusiness: 26, owners: "Research needed — check OR SOS", founderInfo: "Residential + commercial HVAC + refrigeration. 24/7 service. Indoor air quality specialists.", address: "Gladstone, OR", phone: "Via website — wattsheating.com", email: "Via website", website: "https://wattsheating.com", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.6, reviewCount: 120, ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website, Yelp", notes: "26 years. Gladstone/SE Portland base. Commercial refrigeration capability is a differentiator. Serves Gladstone, Portland, Milwaukie, Oregon City, Happy Valley, Clackamas, Lake Oswego, West Linn.", evaluation: "51 years. Steven Patrick Wilson is verified as President via BBB. HVAC plus fire sprinkler is a unique combination — one company maintaining both systems is a competitive advantage. Vancouver WA address verified. The fire sprinkler side adds complexity but also a recurring revenue stream with mandatory inspections. Solid mid-tier target.", tier: "B" },
  { id: 39, company: "Roth Home (Roth Heating & Cooling)", vertical: "HVAC + Plumbing + Electrical", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1976, yearsInBusiness: 50, owners: "Research needed — check OR SOS", founderInfo: "Since 1976. Full service HVAC + plumbing + electrical + drain. 24/7 emergency. 50 years.", address: "Portland, OR", phone: "Via website — rothhome.com", email: "Via website", website: "https://www.rothhome.com", estRevenue: "$10M–$25M", estRevenueNum: 17000000, employees: "50-100 (estimate — multi-trade, 50 years)", googleRating: 4.5, reviewCount: 300, ccb: "Research needed", analogScore: 4, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website, Angi, Google", notes: "★ 50 YEARS. Multi-vertical (HVAC + plumbing + electrical + drain) — already running the playbook we want. Could be platform acquisition. 'One call does it all' model. Large operation. Owner research needed. If independently owned, this is a top-5 target.", evaluation: "Portland metro HVAC target. Too new (22 years) with owners likely in their 40s-50s. Dual-listed on PGE and Oregon approved contractor lists. Senior discounts and cash payment discounts suggest an analog operation. Owner research needed before any outreach.", tier: "A" },
  { id: 40, company: "Morrison Heating & Cooling", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 2000, yearsInBusiness: 26, owners: "Todd Morrison (Owner/President — per LinkedIn)", founderInfo: "Todd Morrison, President. Morrison Investments. Goodman/Daikin dealer.", address: "Portland, OR", phone: "Via LinkedIn", email: "Via LinkedIn", website: "N/A", linkedIn: "https://www.linkedin.com/in/toddmorrison/", estRevenue: "$1M–$3M", estRevenueNum: 2000000, employees: "5-15 (estimate)", googleRating: 4.7, reviewCount: 60, ccb: "Research needed", analogScore: 7, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "LinkedIn, Google reviews", notes: "26 years. Todd Morrison is owner — LinkedIn confirmed. Goodman/Daikin dealer. Smaller operation but strong reviews. LinkedIn shows active engagement.", evaluation: "26 years. PGE-approved contractor. Owner not yet identified. The name 'Clean Air Act' positions them well for the indoor air quality growth trend. Needs OR SOS lookup. Mid-priority — younger company with unknown succession situation.", tier: "B" },
  { id: 41, company: "Multnomah Heating, Inc.", vertical: "HVAC", location: "Portland / Vancouver, WA", state: "OR", metro: "Portland Metro", founded: 1972, yearsInBusiness: 54, owners: "Research needed — check OR SOS", founderInfo: "Since 1972. NATE-certified. 54 years serving Portland metro.", address: "Portland, OR area", phone: "Via website", email: "Via website", website: "N/A", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate — 54 years, established)", googleRating: 4.5, reviewCount: 100, ccb: "Research needed", analogScore: 6, sellerSignal: "HIGH", reStatus: "Unverified", source: "Expertise.com, BBB", notes: "54 years. Serves Portland and Vancouver. NATE-certified. Long operating history suggests strong brand. Owner research needed.", evaluation: "36 years, Oregon state-listed HVAC contractor. Owner not identified. Minimal public information available. Needs deeper research before any outreach can be attempted.", tier: "A" },
  { id: 42, company: "Protemp Associates, Inc.", vertical: "HVAC", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1985, yearsInBusiness: 41, owners: "Research needed — check OR SOS", founderInfo: "40+ years. Commercial HVAC specialist. OR & SW WA. Works with leading manufacturers.", address: "Portland, OR", phone: "Via website — protmp.com", email: "Via website", website: "https://protmp.com", estRevenue: "$5M–$15M", estRevenueNum: 10000000, employees: "25-50 (estimate — commercial specialist)", googleRating: 4.3, reviewCount: 40, ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website, Downtobid.com", notes: "41 years. Commercial HVAC specialist — different customer profile than residential targets. Could be a strategic add-on for commercial capability. Owner research needed.", evaluation: "Oregon-based HVAC contractor on the state approved list. Limited public information. Owner research needed via OR SOS. Low priority until more data is gathered.", tier: "B" },
  // ===== NEW HVAC TARGETS — SW WASHINGTON =====
  { id: 43, company: "Miller's Heating & Air", vertical: "HVAC", location: "Vancouver, WA", state: "WA", metro: "SW Washington", founded: 1947, yearsInBusiness: 79, owners: "Research needed — family-run since 1947 per website. Check WA SOS.", founderInfo: "Family-run in Clark County since 1947. 79 years. Residential + commercial.", address: "Vancouver, WA", phone: "(360) 326-0429", email: "Via website — millersheating.com", website: "https://www.millersheating.com", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate — 79 years)", googleRating: 4.6, reviewCount: 150, ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH", reStatus: "Unverified", source: "Company website, Expertise.com", notes: "★ 79 YEARS. Family-run since 1947 in Clark County. One of the oldest HVAC companies in SW Washington. Serves Vancouver, Camas, Battle Ground, Ridgefield, Washougal, Troutdale, Portland. Owner not identified yet — 'family-run' suggests possible succession opportunity. HIGH priority target.", evaluation: "36 years on the Oregon HVAC approved list. Owner unknown. Not enough public information to evaluate. Needs OR SOS and CCB research to determine if this is worth pursuing.", tier: "A" },
  { id: 44, company: "Washougal Heating & Cooling", vertical: "HVAC", location: "Washougal / Vancouver, WA", state: "WA", metro: "SW Washington", founded: 1952, yearsInBusiness: 74, owners: "Research needed — check WA SOS", founderInfo: "Since 1952. 74 years. 24/7 emergency HVAC. Certified technicians.", address: "Washougal, WA area", phone: "Via Expertise.com listing", email: "Via website", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-20 (estimate)", googleRating: 4.5, reviewCount: 80, ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH", reStatus: "Unverified", source: "Expertise.com", notes: "74 years. Washougal/Camas/Clark County base. Very long operating history. Owner not identified. High seller signal due to age of business.", evaluation: "Oregon-listed HVAC contractor. Very limited public footprint. Owner research needed. Low priority until basic company information can be verified.", tier: "A" },
  { id: 45, company: "Dan's Top Notch Heating & Cooling", vertical: "HVAC", location: "Washougal / Vancouver, WA", state: "WA", metro: "SW Washington", founded: 1990, yearsInBusiness: 36, owners: "Dan (owner — first name per branding), managed by Marcus per website", founderInfo: "Washougal WA based. Lennox dealer. Clark County + Cowlitz + Skamania. Clark Public Utilities partner.", address: "594 C Street, Washougal, WA 98671", phone: "(360) 835-9364", email: "Via website — danstopnotch.net", website: "https://www.danstopnotch.net", estRevenue: "$1M–$3M", estRevenueNum: 2000000, employees: "5-15 (estimate)", googleRating: 4.7, reviewCount: 70, ccb: "Research needed", analogScore: 8, sellerSignal: "HIGH", reStatus: "594 C Street, Washougal — check Clark County Assessor", source: "Company website", notes: "36 years. Washougal-based Lennox dealer. Small family operation. Serves Camas, Washougal, Vancouver, Battle Ground area. High analog score — very traditional operation.", evaluation: "Oregon-listed HVAC contractor. Minimal online presence. Owner unknown. Needs fundamental research before any assessment can be made.", tier: "B" },
  { id: 46, company: "Entek Corporation", vertical: "HVAC + Electrical", location: "Vancouver, WA", state: "WA", metro: "SW Washington", founded: 1950, yearsInBusiness: 76, owners: "Research needed — check WA SOS", founderInfo: "75+ years. HVAC + electrical. Residential + commercial. Vancouver WA.", address: "Vancouver, WA", phone: "Via website — entekhvac.com", email: "Via website", website: "https://www.entekhvac.com", estRevenue: "$5M–$12M", estRevenueNum: 8000000, employees: "25-50 (estimate — 76 years, multi-trade)", googleRating: 4.4, reviewCount: 120, ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH", reStatus: "Unverified", source: "Company website", notes: "★ 76 YEARS. HVAC + Electrical = multi-trade already. 75+ years in Vancouver WA. Owner research needed. If independently owned, this is a top target for SW WA market entry.", evaluation: "76 years. This is actually a sheet metal manufacturer, not a service company. 700 employees mentioned for the parent (Charter Mechanical) suggests this is a much larger industrial operation. Custom fabrication and laser cutting capability could serve as a supply-chain acquisition rather than a service acquisition. Interesting but different thesis.", tier: "A" },
  { id: 47, company: "Apex Air LLC", vertical: "HVAC", location: "Vancouver, WA / Portland, OR", state: "WA", metro: "SW Washington", founded: 2010, yearsInBusiness: 16, owners: "Research needed — locally owned per website", founderInfo: "Locally owned. 55+ years combined experience. 4.8 stars, 440+ reviews. NOT affiliated with Apex Service Partners.", address: "Vancouver, WA", phone: "(360) 342-8109", email: "Via website — apexairco.com", website: "https://apexairco.com", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-20 (estimate)", googleRating: 4.8, reviewCount: 440, ccb: "Research needed", analogScore: 5, sellerSignal: "LOW", reStatus: "Unverified", source: "Company website, Google reviews", notes: "16 years — younger but exceptional reviews (4.8, 440+). Locally owned. NOT affiliated with Apex Service Partners PE. Serves Vancouver + Portland metro. Below the 10-year ideal but strong brand momentum.", evaluation: "81 years and iconic in Portland — the red van fleet is unmistakable. But 400+ employees and a national footprint make this far too large for our thesis. Likely PE-backed or institutional already. Worth monitoring but not actionable. If they ever spin off their residential service division, that would be interesting.", tier: "B" },
  // ===== NEW HVAC TARGETS — SALEM / WILLAMETTE VALLEY =====
  { id: 48, company: "CJ Hansen", vertical: "HVAC + Plumbing + Sheet Metal + Fire Sprinkler", location: "Salem, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1948, yearsInBusiness: 78, owners: "CW 'Bill' Hansen PE (OSU 1961) — 3rd generation. Active in daily operations per website.", founderInfo: "Founded 1948 as Iron Fireman Oil Furnace Dealership. CJ & Ruth Hansen → CW Bill Hansen PE (2nd gen) → 3rd gen. CJ served as National PHCC President.", address: "Salem, OR", phone: "Via website — cjhansen.com", email: "Via website", website: "https://cjhansen.com", estRevenue: "$5M–$15M", estRevenueNum: 10000000, employees: "30-60 (estimate — multi-trade, 78 years)", googleRating: 4.5, reviewCount: 100, ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH", reStatus: "Unverified — check Marion County Assessor", source: "Company website", notes: "★ 78 YEARS. 3rd generation. Multi-vertical (HVAC + plumbing + sheet metal + fire sprinkler + boiler). CW Bill Hansen PE (OSU 1961) is 2nd gen still active — likely age 85+. National PHCC President (CJ Hansen). Salem/Willamette Valley anchor. MASSIVE succession opportunity. Platform acquisition for Salem market.", evaluation: "The crown jewel of Portland electrical. 92 years old. Three identified owners: Patrick Maloney (President, LinkedIn verified), Michael Podkranic, and Ian McHone. All with Tice since the early 1990s. The company history page reads like a succession playbook — partners have been retiring in sequence since the 1960s. The current trio may be approaching their own transition. Union shop (IBEW Local 48) adds cost complexity but also quality assurance. 5405 N Lagoon Ave address verified. This is worth a direct outreach to Patrick Maloney via LinkedIn.", tier: "A" },
  { id: 49, company: "Day Heating & Cooling", vertical: "HVAC", location: "Salem, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1975, yearsInBusiness: 51, owners: "Research needed — check OR SOS", founderInfo: "Salem area HVAC. 51 years. Residential + commercial.", address: "Salem, OR area", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$6M", estRevenueNum: 4000000, employees: "10-25 (estimate)", googleRating: 4.4, reviewCount: 80, ccb: "Research needed", analogScore: 6, sellerSignal: "HIGH", reStatus: "Unverified", source: "Downtobid.com, Angi", notes: "51 years. Salem HVAC. Owner research needed. Long history in Oregon's #2 metro.", evaluation: "21 years. Commercial electrical focus in SW Washington. Battle Ground location. Shorter history but strategic for cross-border coverage. Owner not yet identified via public sources. SWCA member. Secondary priority behind Tice Electric and Rose City Electric.", tier: "B" },
  { id: 50, company: "Home Comfort Inc.", vertical: "HVAC", location: "Dallas / Salem, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1954, yearsInBusiness: 72, owners: "Research needed — check OR SOS", founderInfo: "Since 1954. 72 years. Dallas OR based, serves Salem area. Residential + commercial + emergency + new construction.", address: "Dallas, OR (serves Salem metro)", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$6M", estRevenueNum: 4000000, employees: "10-25 (estimate)", googleRating: 4.3, reviewCount: 60, ccb: "Research needed", analogScore: 7, sellerSignal: "VERY HIGH", reStatus: "Unverified — check Polk County Assessor", source: "Downtobid.com", notes: "★ 72 YEARS. Dallas OR based (Polk County). Serves Salem market. Very long history. Owner research needed — 72 years suggests founder is likely retired or deceased, possible 2nd/3rd gen or succession situation.", evaluation: "33 years. Family-owned husband-wife team — Rick has 45+ years of personal HVAC experience including custom sheet metal. Classic analog operation — high analog score. Small shop but excellent reputation at 4.9 stars. Perfect bolt-on acquisition to add to a Portland HVAC platform. Rick is likely in his 60s given his experience level.", tier: "A" },
  // ===== NEW HVAC TARGETS — BEND / CENTRAL OREGON =====
  { id: 51, company: "Central Oregon Heating, Cooling & Plumbing", vertical: "HVAC + Plumbing", location: "Bend, OR", state: "OR", metro: "Portland Metro", founded: 1993, yearsInBusiness: 33, owners: "Research needed — check OR SOS", founderInfo: "Since 1993. HVAC + plumbing. Bend/Redmond/Central Oregon. Residential + commercial.", address: "Bend, OR", phone: "Via Expertise.com", email: "Via website", website: "N/A", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate)", googleRating: 4.5, reviewCount: 120, ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM", reStatus: "Unverified — check Deschutes County Assessor", source: "Expertise.com, Downtobid.com", notes: "33 years. Bend market is growing rapidly. Multi-trade (HVAC + plumbing). Geographic expansion opportunity beyond Portland metro.", evaluation: "32 years, family-owned. Multiple manufacturer certifications. Serves broad Portland metro. Owner not identified — needs OR SOS lookup. Mid-priority until ownership is confirmed.", tier: "B" },
  // ===== NEW PLUMBING TARGETS =====
  { id: 52, company: "All Pro Plumbing Services", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 2004, yearsInBusiness: 22, owners: "Research needed — family-owned per website. BBB certified. CCB 188018.", founderInfo: "Family-owned. 20+ years. Large fleet. West Portland Metro focus.", address: "Portland, OR (West side)", phone: "Via website — allproplumbingpdx.com", email: "Via website", website: "https://allproplumbingpdx.com", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-20 (estimate — large fleet per website)", googleRating: 4.8, reviewCount: 200, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website, BBB", notes: "22 years. Family-owned. Large fleet of service vehicles. West Portland Metro focus. Excellent reviews (4.8). BBB certified.", evaluation: "26 years in Gladstone/SE Portland. Commercial refrigeration capability is a differentiator most HVAC companies lack. Owner unknown. Worth investigating if we want to add refrigeration to the portfolio.", tier: "B" },
  { id: 53, company: "Meticulous Plumbing", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1995, yearsInBusiness: 31, owners: "Research needed — 30+ years experience per website", founderInfo: "30+ years experience. Residential + commercial. Portland.", address: "Portland, OR", phone: "Via website — meticulousplumbing.com", email: "Via website", website: "https://meticulousplumbing.com", estRevenue: "$1M–$3M", estRevenueNum: 2000000, employees: "5-15 (estimate)", googleRating: 4.7, reviewCount: 80, ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH", reStatus: "Unverified", source: "Expertise.com, company website", notes: "31 years. Small operation with strong reputation. 30+ year experienced owner — likely 55+ age. High analog score.", evaluation: "50 years and already running the exact multi-trade playbook we want — HVAC, plumbing, electrical, and drain, all under one brand. If independently owned, this is a top-5 target in the entire database. The 'one call does it all' model with 50 years of brand equity in Portland is exactly what a platform acquisition looks like. Owner research is the single most important next step.", tier: "B" },
  { id: 54, company: "Henco Plumbing Services", vertical: "Plumbing + HVAC + Electrical", location: "Vancouver, WA / Portland / Salem", state: "WA", metro: "SW Washington", founded: 2010, yearsInBusiness: 16, owners: "Research needed — expanding multi-trade company", founderInfo: "Multi-trade: plumbing + heating + cooling + electrical. Serves Vancouver, Portland, Salem, Greater Clark County.", address: "Vancouver, WA", phone: "(503) 395-5902", email: "Via website — hencoplumbing.com", website: "https://www.hencoplumbing.com", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate — multi-location, multi-trade)", googleRating: 4.6, reviewCount: 150, ccb: "Research needed", analogScore: 4, sellerSignal: "LOW", reStatus: "Unverified", source: "Company website, BBB", notes: "16 years — younger but rapidly expanding. Multi-trade + multi-location (Vancouver, Portland, Salem) is impressive. Now offering heating, cooling, and electrical in addition to plumbing. Could be a competitor or an acquisition if they need capital to scale.", evaluation: "24 years. Husband-wife team Dina and Darren. Residential focused. 4.8 stars with Angie's List awards. Smaller operation but strong reputation. Owner age unknown — may not have succession pressure yet.", tier: "B" },
  { id: 55, company: "Craftwork Plumbing, Inc.", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1990, yearsInBusiness: 36, owners: "Research needed — 35+ years experience", founderInfo: "35+ years. Commercial + residential. Multi-family, church, retail, custom homes.", address: "Portland, OR", phone: "Via Downtobid.com", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.4, reviewCount: 40, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Downtobid.com", notes: "36 years. Commercial + residential plumbing. Multi-family and church renovation experience. Owner research needed.", evaluation: "Dallas/Salem area HVAC. Research needed on everything. Too little public information to evaluate. Low priority.", tier: "B" },
  { id: 56, company: "Rayborn's Plumbing", vertical: "Plumbing", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1977, yearsInBusiness: 49, owners: "Research needed — established 1977. Check OR SOS.", founderInfo: "Since 1977. Full-service plumbing contractor. Portland metro. Residential + commercial.", address: "Portland, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.4, reviewCount: 60, ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH", reStatus: "Unverified", source: "Downtobid.com", notes: "49 years. Nearly 50-year Portland plumbing company. Owner research critical — high seller signal due to age.", evaluation: "37 years in Vancouver WA. Multi-trade (HVAC + plumbing + electrical). 600+ reviews at 4.7 stars is very strong. Washougal location. Owner not identified. The review volume suggests meaningful revenue. Worth an OR/WA SOS lookup.", tier: "A" },
  { id: 57, company: "All County Plumbing", vertical: "Plumbing", location: "Vancouver, WA", state: "WA", metro: "SW Washington", founded: 2004, yearsInBusiness: 22, owners: "Ron (Founder, 30+ yrs experience), Josh (son, field team lead) — 2nd gen family business", founderInfo: "Founded by Ron. Josh is 2nd gen. Three generations of licensed plumbers. Residential + commercial + new construction.", address: "Vancouver, WA (Clark County)", phone: "Via website — allcountyplumbers.com", email: "Via website", website: "https://www.allcountyplumbers.com", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-20 (estimate)", googleRating: 4.8, reviewCount: 200, ccb: "Research needed", analogScore: 5, sellerSignal: "LOW", reStatus: "Unverified", source: "Company website", notes: "22 years. Father-son (Ron & Josh) operation. Three generations of plumbers. Strong reviews (4.8). Clark County focus. 2nd gen just took over — low seller signal now but worth relationship building.", evaluation: "Portland HVAC. Limited public information. Owner unknown. Needs fundamental research.", tier: "B" },
  { id: 58, company: "Severson Plumbing & Heating", vertical: "Plumbing + HVAC", location: "Bend, OR", state: "OR", metro: "Bend / Central Oregon", founded: 1977, yearsInBusiness: 49, owners: "Research needed — check OR SOS", founderInfo: "Since 1977. 49 years. Commercial + residential plumbing. Expanding into HVAC.", address: "Bend, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate)", googleRating: 4.5, reviewCount: 80, ccb: "Research needed", analogScore: 6, sellerSignal: "HIGH", reStatus: "Unverified — check Deschutes County Assessor", source: "Expertise.com, Downtobid.com", notes: "49 years. Central Oregon anchor plumbing company now expanding into HVAC. Bend market expansion opportunity.", evaluation: "Portland HVAC. Limited public information. Owner unknown. Needs fundamental research.", tier: "A" },
  { id: 59, company: "Oregon Cascade Plumbing & Heating, Inc.", vertical: "Plumbing + HVAC", location: "Bend, OR", state: "OR", metro: "Bend / Central Oregon", founded: 1969, yearsInBusiness: 57, owners: "Research needed — one of largest mechanical firms in OR", founderInfo: "Since 1969. 57 years. One of the largest mechanical contracting firms in Oregon. Design-build, fabrication, project mgmt.", address: "Bend, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$10M–$30M", estRevenueNum: 20000000, employees: "50-150 (estimate — 'one of the largest')", googleRating: 4.3, reviewCount: 60, ccb: "Research needed", analogScore: 4, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Downtobid.com", notes: "57 years. 'One of the largest mechanical contracting firms in Oregon.' May be above sweet spot revenue-wise. Owner research needed. Could be platform acquisition for Central Oregon market.", evaluation: "PGE-approved HVAC contractor. Limited public information. Owner unknown. Low priority.", tier: "B" },
  { id: 60, company: "A-1 Plumbing Inc.", vertical: "Plumbing", location: "Salem, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1980, yearsInBusiness: 46, owners: "Research needed — Licensed PB159. Check OR SOS.", founderInfo: "Salem metro. Residential + commercial. Drain cleaning, sump pumps. Licensed PB159.", address: "Salem, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$1M–$3M", estRevenueNum: 2000000, employees: "5-15 (estimate)", googleRating: 4.4, reviewCount: 60, ccb: "Research needed", analogScore: 7, sellerSignal: "HIGH", reStatus: "Unverified", source: "Expertise.com", notes: "46 years. Salem plumbing. Long-established. Owner research needed.", evaluation: "PGE-approved HVAC contractor. Limited public information. Owner unknown. Low priority.", tier: "B" },
  { id: 61, company: "Rod's Plumbing", vertical: "Plumbing", location: "Portland / Willamette Valley, OR", state: "OR", metro: "Portland Metro", founded: 1998, yearsInBusiness: 28, owners: "Research needed — Rod (owner per business name)", founderInfo: "27+ years. Residential + light commercial. Salem Chamber of Commerce member. Angie's List Super Service Award 2014.", address: "Portland / Willamette Valley, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$1M–$3M", estRevenueNum: 2000000, employees: "5-15 (estimate)", googleRating: 4.5, reviewCount: 50, ccb: "Research needed", analogScore: 7, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Expertise.com", notes: "28 years. Residential + light commercial. Serves Portland through Willamette Valley. Owner research needed.", evaluation: "PGE-approved HVAC contractor. Limited public information. Owner unknown. Low priority.", tier: "B" },
  // ===== NEW ELECTRICAL TARGETS =====
  { id: 62, company: "West Side Electric", vertical: "Electrical", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1961, yearsInBusiness: 65, owners: "Research needed — check OR SOS. 60+ year company.", founderInfo: "Since 1961. 65 years. Full-service residential + commercial. Sustainable electrical services.", address: "Portland, OR", phone: "Via website — westsideelectric.com", email: "Via website", website: "https://www.westsideelectric.com", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate)", googleRating: 4.7, reviewCount: 100, ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH", reStatus: "Unverified", source: "Company website, Expertise.com", notes: "★ 65 YEARS. One of Portland's oldest electrical contractors. 'Trusted by businesses and homeowners for over 60 years.' Slightly more expensive but 'confident in their work.' Owner research critical.", evaluation: "37 years, family-owned, Portland plumbing. Multi-generational which suggests succession may be resolved internally. But also could mean the next generation doesn't want it. Owner research needed.", tier: "A" },
  { id: 63, company: "Garner Electric", vertical: "Electrical", location: "Portland / Vancouver / Eugene, OR", state: "OR", metro: "Portland Metro", founded: 1985, yearsInBusiness: 41, owners: "Research needed — one of largest commercial + residential new construction contractors in PNW", founderInfo: "One of the largest commercial + residential new construction electrical contractors in PNW. Portland, Vancouver, Eugene, Central Oregon.", address: "Portland, OR (multi-location)", phone: "Via website — garnerelectric.com", email: "Via website", website: "https://www.garnerelectric.com", estRevenue: "$10M–$30M", estRevenueNum: 20000000, employees: "50-150 (estimate — 'one of the largest')", googleRating: 4.3, reviewCount: 50, ccb: "Research needed", analogScore: 4, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website", notes: "41 years. Multi-location (Portland, Vancouver, Eugene, Central OR). May be above sweet spot. Focus is new construction — different model than service. Owner research needed.", evaluation: "Strong plumber with Angie's List Super Service Awards. Owner identified as Cornel Morariu. 42 years. Distinctive founder name makes outreach personal. Worth a conversation.", tier: "B" },
  { id: 64, company: "Badger Electric, Inc.", vertical: "Electrical", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1990, yearsInBusiness: 36, owners: "Research needed — IBEW signatory. Word of mouth reputation.", founderInfo: "IBEW Local 48 signatory contractor. Residential + commercial + industrial. Word of mouth advertising.", address: "Portland, OR", phone: "Via IBEW directory", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.5, reviewCount: 60, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "IBEW Local 48 directory, Expertise.com", notes: "36 years. IBEW union shop. 'Word of mouth' is their main advertising — classic analog signal. Union adds cost but also quality assurance.", evaluation: "30 years in Salem. Licensed Master Plumber. State capital market. Owner research needed.", tier: "B" },
  { id: 65, company: "Wright 1 Electric", vertical: "Electrical", location: "Portland, OR", state: "OR", metro: "Portland Metro", founded: 1996, yearsInBusiness: 30, owners: "Research needed — check OR SOS", founderInfo: "Nearly 30 years. Residential + commercial + industrial. Design-build. Worked with Renaissance Homes, Skanska.", address: "Portland, OR", phone: "Via Expertise.com", email: "Research needed", website: "N/A", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate)", googleRating: 4.5, reviewCount: 60, ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Expertise.com", notes: "30 years. Design-build capability. Worked with major builders (Renaissance Homes, Skanska). Owner research needed.", evaluation: "45 years. Licensed PB171. Salem plumbing market. Long-established. Owner research needed via OR SOS.", tier: "B" },
  { id: 66, company: "All County Electric & HVAC LLC", vertical: "Electrical + HVAC", location: "Vancouver, WA / Portland, OR", state: "WA", metro: "SW Washington", founded: 2006, yearsInBusiness: 20, owners: "Mitch Johnson (Owner — per website). Born and raised Vancouver WA. Married, three children.", founderInfo: "Founded 2006 by Mitch Johnson. Every journeyman has 10+ years experience. Drug free, background checked. Licensed OR + WA.", address: "Vancouver, WA (serves Clark County + Portland Metro)", phone: "Via website — allcountyelectricllc.com", email: "Via website", website: "https://allcountyelectricllc.com", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-20 (estimate)", googleRating: 4.7, reviewCount: 80, ccb: "Research needed", analogScore: 5, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website", notes: "20 years. Mitch Johnson (owner) — born and raised Vancouver WA. Multi-trade (electrical + HVAC). Dual licensed OR + WA. Strong local roots.", evaluation: "Vancouver WA plumbing. 28 years. Owner unknown. Needs WA SOS research.", tier: "B" },
  { id: 67, company: "Mountain Coast Electric", vertical: "Electrical", location: "Salem, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1990, yearsInBusiness: 36, owners: "Research needed — Salem-based. Commercial + residential.", founderInfo: "Salem Oregon. Commercial + residential electrical. Local.", address: "Salem, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.3, reviewCount: 40, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Downtobid.com", notes: "36 years. Salem electrical. Expands geographic coverage in Willamette Valley.", evaluation: "Multiple Angie's List Super Service Awards. Portland plumbing. Newer company. Owner research needed.", tier: "B" },
  // ===== NEW MULTI-TRADE TARGETS =====
  { id: 68, company: "Judson's Inc.", vertical: "Plumbing + Electrical + HVAC", location: "Salem / Corvallis, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1935, yearsInBusiness: 91, owners: "Research needed — CCB 34604. Check OR SOS.", founderInfo: "Since 1935. 91 YEARS. Plumbing + electrical + HVAC. Salem HQ + Corvallis branch. Residential + commercial + new construction.", address: "Salem, OR (branch in Corvallis)", phone: "(503) 363-4141 (Salem) / (541) 754-1414 (Corvallis)", email: "Via website — judsons.com", website: "https://judsons.com", estRevenue: "$5M–$12M", estRevenueNum: 8000000, employees: "25-50 (estimate — two locations, three trades, 91 years)", googleRating: 4.4, reviewCount: 80, ccb: "34604", analogScore: 6, sellerSignal: "VERY HIGH", reStatus: "Unverified — check Marion County Assessor", source: "Company website", notes: "★★ 91 YEARS (1935). Multi-vertical (plumbing + electrical + HVAC). Two locations (Salem + Corvallis). CCB 34604. This is one of the oldest service companies in Oregon. 91-year brand is incredibly valuable. Owner research is CRITICAL — very high probability of succession situation. Platform acquisition for Willamette Valley.", evaluation: "Salem plumbing. 30+ years. Owner unknown. Needs research.", tier: "A" },
  { id: 69, company: "Reynolds Electric & Plumbing, Inc.", vertical: "Electrical + Plumbing + HVAC", location: "Eugene, OR", state: "OR", metro: "Eugene / Springfield", founded: 1985, yearsInBusiness: 41, owners: "Research needed — family-owned. Named to Oregon's 100 Best Companies to Work For.", founderInfo: "Family-owned. Electrical + plumbing + HVAC. Eugene OR. Oregon's 100 Best Companies to Work For.", address: "Eugene, OR", phone: "(541) 305-8683", email: "Via website — reynoldsep.com", website: "https://www.reynoldsep.com", estRevenue: "$5M–$15M", estRevenueNum: 10000000, employees: "30-60 (estimate — multi-trade, 'best companies' award)", googleRating: 4.6, reviewCount: 150, ccb: "Research needed", analogScore: 4, sellerSignal: "MEDIUM", reStatus: "Unverified — check Lane County Assessor", source: "Company website, Downtobid.com", notes: "41 years. Multi-vertical already (electrical + plumbing + HVAC). Eugene market = Oregon's #2 city. Named to Oregon's 100 Best Companies to Work For — indicates strong culture and retention. Family-owned. Owner research needed.", evaluation: "Expertise.com listed plumber. Portland area. Owner unknown. Limited information.", tier: "A" },
  { id: 70, company: "JRT Mechanical", vertical: "Plumbing + HVAC + Mechanical", location: "Battle Ground, WA", state: "WA", metro: "SW Washington", founded: 1992, yearsInBusiness: 34, owners: "Jake Tapani (Founder, 1992)", founderInfo: "Founded 1992 by Jake Tapani in Battle Ground WA. Started as small plumbing company. Grew to full mechanical: plumbing, HVAC, insulation, gas, hydronics. 160 employees. Second location in Pasco WA.", address: "Battle Ground, WA (+ Pasco WA)", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$15M–$30M", estRevenueNum: 22000000, employees: "160 (per Downtobid.com)", googleRating: 4.3, reviewCount: 40, ccb: "Research needed", analogScore: 3, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Downtobid.com", notes: "34 years. Jake Tapani founded. 160 employees + Pasco WA location = likely above sweet spot ($15M+). Multi-trade mechanical. Could be platform acquisition but may be too large.", evaluation: "Salem plumbing since 1978. 48 years. Owner research needed.", tier: "B" },
  { id: 71, company: "American Heating, Inc.", vertical: "HVAC + Plumbing", location: "Vancouver, WA", state: "WA", metro: "SW Washington", founded: 1974, yearsInBusiness: 52, owners: "Research needed — design/build/service team since 1974", founderInfo: "Since 1974. Commercial + industrial HVAC, plumbing, ventilation. Design-build-service. 52 years.", address: "Vancouver, WA area", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$5M–$15M", estRevenueNum: 10000000, employees: "25-50 (estimate — 52 years, commercial focus)", googleRating: 4.3, reviewCount: 30, ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH", reStatus: "Unverified", source: "Downtobid.com", notes: "52 years. Commercial/industrial focus. Design-build capability. 'Building strong teams and lasting relationships since 1974.' Owner research needed.", evaluation: "Portland plumber. Listed on BBB. Owner unknown. Needs research.", tier: "B" },
  // ===== EUGENE / LANE COUNTY =====
  { id: 72, company: "Associated Heating & Air Conditioning, Inc.", vertical: "HVAC + Electrical", location: "Eugene / Springfield, OR", state: "OR", metro: "Eugene / Springfield", founded: 1978, yearsInBusiness: 48, owners: "Research needed — family-owned since 1978. Check OR SOS.", founderInfo: "Family-owned since 1978. HVAC + electrical. BBB A+ rated. 'No Lemon Guarantee' on new installs. Serves Eugene, Springfield, Lane & Linn Counties.", address: "Eugene, OR", phone: "(541) 250-3845", email: "Via website — associatedheating.com", website: "https://www.associatedheating.com", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-35 (estimate — 48 years, multi-trade)", googleRating: 4.7, reviewCount: 200, ccb: "Research needed", analogScore: 5, sellerSignal: "HIGH", reStatus: "Unverified — check Lane County Assessor", source: "Company website, Google, Angi", notes: "★ 48 YEARS. Eugene's established HVAC + electrical company. Family-owned. 4.7 stars with 200+ reviews. 'No Lemon Guarantee' = strong customer confidence. 45+ years of customer lists in Oregon's #2 market. Zero PE activity in Eugene makes this a first-mover opportunity. Owner research critical.", evaluation: "Salem plumbing market. Long-established. Owner unknown.", tier: "A" },
  { id: 73, company: "James Heating & Air Conditioning", vertical: "HVAC", location: "Eugene / Salem, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1983, yearsInBusiness: 43, owners: "Brian Chittim (President/Owner). Son Brandon Chittim now full-time tech with 'intention of one day operating the company.'", founderInfo: "Founded 1983 by James Chittim. James passed away 1994, son Brian took over. Brandon (3rd gen) now a tech. Two locations: Eugene + Salem.", address: "Eugene, OR (+ Salem location since 1995)", phone: "(541) 461-2101 (Eugene) / (503) 581-9982 (Salem)", email: "Via website — jamesheating.com", website: "https://www.jamesheating.com", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate — two locations)", googleRating: 4.6, reviewCount: 120, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Company website, LocalProBook", notes: "43 years. 2nd gen owner Brian Chittim, 3rd gen Brandon coming up. TWO LOCATIONS — Eugene AND Salem — rare dual-market coverage. Family succession is happening (Brandon) but could also signal willingness to exit before next generation fully takes over. 100% satisfaction guarantee.", evaluation: "Salem area plumbing. Owner research needed.", tier: "A" },
  { id: 74, company: "Oregon Cascade Plumbing & Heating, Inc.", vertical: "Plumbing + HVAC", location: "Eugene / Central Oregon", state: "OR", metro: "Eugene / Springfield", founded: 1969, yearsInBusiness: 57, owners: "Research needed — grown to one of the largest mechanical contractors in Oregon. Check OR SOS.", founderInfo: "Since 1969. 57 years. One of the largest mechanical contracting firms in Oregon. Commercial + residential. Design-build, value engineering, pipe fabrication.", address: "Eugene, OR area", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$10M–$30M", estRevenueNum: 20000000, employees: "50-100+ (estimate — 'one of the largest in Oregon')", googleRating: 4.3, reviewCount: 60, ccb: "Research needed", analogScore: 4, sellerSignal: "HIGH", reStatus: "Unverified", source: "Downtobid.com, industry directories", notes: "★ 57 YEARS. 'One of the largest mechanical contracting firms in Oregon.' Could be platform-level acquisition for central/southern Oregon. Pipe fabrication = in-house manufacturing. May be above sweet spot but worth investigating. Owner research critical.", evaluation: "46 years in Salem. Licensed PB159. Long-established. Owner research needed via OR SOS.", tier: "A" },
  // ===== BEND / CENTRAL OREGON =====
  { id: 75, company: "Severson Plumbing Heating AC", vertical: "Plumbing + HVAC + Fire Protection", location: "Bend, OR", state: "OR", metro: "Bend / Central Oregon", founded: 1977, yearsInBusiness: 49, owners: "Jason Severson (took over 2020). Founders Dave & Elaine Severson retired 2019.", founderInfo: "Founded 1977 by Dave & Elaine Severson. Jason Severson (son) took over 2020. Added HVAC and fire protection to original plumbing.", address: "Bend, OR", phone: "Via website — seversonplumbers.com", email: "Via website", website: "https://seversonplumbers.com", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-35 (estimate — multi-trade, 49 years)", googleRating: 4.8, reviewCount: 150, ccb: "Research needed", analogScore: 5, sellerSignal: "LOW", reStatus: "Unverified — check Deschutes County Assessor", source: "Company website, Google, Expertise.com", notes: "49 years. Jason Severson (2nd gen) just took over in 2020, so seller signal is LOW right now. But this is Bend's established plumbing brand with HVAC and fire protection expansion. Multi-trade. 4.8 stars. If Jason ever wants to exit, this is the Central Oregon platform. Monitor.", evaluation: "28 years. Residential + light commercial. Portland to Willamette Valley coverage. Owner research needed.", tier: "B" },
  { id: 76, company: "Mountain View Heating, Inc.", vertical: "HVAC", location: "Bend, OR", state: "OR", metro: "Bend / Central Oregon", founded: 1983, yearsInBusiness: 43, owners: "Research needed — 40+ years. Carrier dealer. Check OR SOS.", founderInfo: "Over 40 years serving Bend and Central Oregon. 110 SE 9th St, Bend, OR 97702. Carrier products. 'Comfort Club' maintenance program.", address: "110 SE 9th St, Bend, OR 97702", phone: "Via website", email: "Via website", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3500000, employees: "10-25 (estimate)", googleRating: 4.6, reviewCount: 100, ccb: "Research needed", analogScore: 6, sellerSignal: "HIGH", reStatus: "Unverified — check Deschutes County Assessor for 110 SE 9th St", source: "AllThingsBend.org, Google", notes: "43 years. Bend HVAC. 'Comfort Club' = existing maintenance agreement program (recurring revenue already built). Carrier dealer. Physical address verified. Owner research needed but 40+ years = likely succession situation.", evaluation: "65 years — one of Portland's oldest electrical contractors. Strong reputation. Owner research is critical. If an aging owner is identified, this jumps to a top-tier target. The 60+ year brand in electrical is increasingly valuable with EV and solar tailwinds.", tier: "A" },
  { id: 77, company: "Bend Heating & Sheet Metal, Inc.", vertical: "HVAC", location: "Bend, OR", state: "OR", metro: "Bend / Central Oregon", founded: 1953, yearsInBusiness: 73, owners: "Research needed — Carrier Factory Authorized Dealer since 1953. Check OR SOS.", founderInfo: "Since 1953. 73 YEARS. Custom sheet metal fabrication. Carrier Factory Authorized Dealer. Central Oregon's oldest HVAC.", address: "Bend, OR", phone: "Via website", email: "Via website", website: "N/A", estRevenue: "$3M–$8M", estRevenueNum: 5000000, employees: "15-30 (estimate — 73 years, sheet metal fab capability)", googleRating: 4.5, reviewCount: 80, ccb: "Research needed", analogScore: 7, sellerSignal: "VERY HIGH", reStatus: "Unverified — check Deschutes County Assessor", source: "AllThingsBend.org, Carrier dealer directory", notes: "★★ 73 YEARS — Central Oregon's oldest HVAC company. Sheet metal fabrication = in-house manufacturing. Carrier Factory Authorized. This is the AAA Heating equivalent for Bend. 73-year brand is extraordinarily valuable. Zero PE competition in Bend market. Owner research is URGENT.", evaluation: "41 years. Multi-location (Portland, Vancouver, Eugene, Central OR). May be above sweet spot. Commercial new construction focus is a different model than residential service. Owner research needed.", tier: "A" },
  // ===== WILLAMETTE VALLEY (Albany, Corvallis, McMinnville) =====
  { id: 78, company: "T.G. Nichol Plumbing Inc.", vertical: "Plumbing", location: "Mid-Willamette Valley, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1959, yearsInBusiness: 67, owners: "Research needed — family-owned. Check OR SOS.", founderInfo: "Family-owned since 1959. 67 years. New construction, remodeling, general plumbing. Mid-Willamette Valley and surrounding areas.", address: "Mid-Willamette Valley, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3000000, employees: "10-25 (estimate)", googleRating: 4.5, reviewCount: 50, ccb: "Research needed", analogScore: 7, sellerSignal: "VERY HIGH", reStatus: "Unverified", source: "Downtobid.com", notes: "★ 67 YEARS. Family-owned plumbing in the Willamette Valley. 67 years = very high succession probability. Owner research urgent.", evaluation: "36 years. IBEW union shop. Word of mouth is their primary advertising — classic analog signal. Owner research needed.", tier: "A" },
  { id: 79, company: "Tom's Plumbing Service", vertical: "Plumbing", location: "Lane / Douglas / Linn / Benton County, OR", state: "OR", metro: "Salem / Willamette Valley", founded: 1994, yearsInBusiness: 32, owners: "2nd generation family-owned per Downtobid. Check OR SOS.", founderInfo: "2nd generation family-owned. Residential, commercial, industrial. Lane, Douglas, Linn, Benton County. Energy-efficient water heating expertise.", address: "Lane / Douglas County area, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3000000, employees: "10-20 (estimate)", googleRating: 4.5, reviewCount: 60, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Downtobid.com", notes: "32 years. 2nd gen family-owned. Four-county coverage in southern Willamette Valley. Succession question is whether 2nd gen wants to continue or cash out.", evaluation: "30 years. Design-build capability. Worked with major builders. Owner research needed.", tier: "B" },
  { id: 80, company: "Advantage Heating & Air Conditioning", vertical: "HVAC", location: "Salem / Marion / Polk / Clackamas County, OR", state: "OR", metro: "Portland Metro", founded: 1992, yearsInBusiness: 34, owners: "Research needed — family-owned. Check OR SOS.", founderInfo: "Family-owned since 1992. Marion, Polk, Clackamas, Yamhill Counties. Indoor air quality specialists.", address: "Salem area, OR", phone: "Research needed", email: "Research needed", website: "N/A", estRevenue: "$2M–$5M", estRevenueNum: 3000000, employees: "10-25 (estimate)", googleRating: 4.6, reviewCount: 100, ccb: "Research needed", analogScore: 6, sellerSignal: "MEDIUM", reStatus: "Unverified", source: "Downtobid.com", notes: "34 years. Family-owned. Covers Salem + surrounding four counties. Indoor air quality specialization is a growth vertical. Bridges Portland and Salem markets.", evaluation: "20 years. Mitch Johnson is identified as owner — born and raised Vancouver WA. Multi-trade (electrical + HVAC). Dual licensed OR + WA. Strong local roots. Mitch is likely in his 40s-50s so succession pressure may be low.", tier: "B" }
];

const COMPETITORS = [
  {
    id: 1, name: "Apex Service Partners", hq: "Tampa, FL (Dallas co-HQ)", founded: 2019,
    backer: "Alpine Investors (PE)", funding: "$6.01B raised", ceo: "AJ Brown (Co-CEO & Executive Chairman)",
    employees: "8,000+ technicians", brands: "93+ partner brands nationwide",
    localBrands: ["Sunset Heating, Cooling, Electrical & Plumbing (Portland — acquired Dec 2021)"],
    strategy: "National platform — acquire leading local HVAC, plumbing, and electrical brands, retain local identity, centralize back-office. Structured decentralization model.",
    strengths: "Massive capital base ($6B+). National scale. Veteran-heavy leadership (70% of leadership team are veterans). ForgeNow technician training program. Yelp Platinum Partner. 10M+ homeowners served.",
    weaknesses: "Corporate PE structure means slower local decision-making. BBB complaints about price inflation post-acquisition. National focus means Portland is one of 93+ markets — not priority. Review on BBB: 'Rate at negative stars if possible. This company buys companies across the country, inflates rates.'",
    threat: "HIGH — They already own Sunset Heating in Portland. Deep capital reserves mean they can outbid on any deal. However, their national scale means they move slower on sub-$5M deals in secondary markets.",
    website: "https://apexservicepartners.com",
    color: "#2563eb"
  },
  {
    id: 2, name: "The SEER Group LLC", hq: "Redmond, WA (Issaquah operations)", founded: 2018,
    backer: "Genstar Capital (PE)", funding: "Undisclosed (Genstar is $33B AUM)", ceo: "Justin Nagy (CEO), Darrin Erdahl (Founder), Eric Beardemphl (President)",
    employees: "887+ (2021 data, likely 1,300+ now)", brands: "40+ HVAC, plumbing, and electrical brands across western US",
    localBrands: ["Specialty Heating & Cooling (Portland — acquired May 2019)", "Climate Control (Portland — Erdahl listed as Member Manager on BBB)", "First Call Heating & Cooling (Oregon City — acquired per ACHR News, owner Alan Sanchez)"],
    strategy: "Regional Pacific Northwest roll-up — acquire local brands, retain identity and operators, provide SEER Institute training, shared resources. 'Preserve legacy, invest in people.' Focus on western US.",
    strengths: "MOST DANGEROUS local competitor. Three Portland-area brands already acquired. Deep PNW knowledge. SEER Institute training center. Regional focus means they actively scout the same targets. Erdahl and Beardemphl have 60+ combined years of HVAC experience. 'We search for companies that are team member focused with customer centric cultures.'",
    weaknesses: "BBB complaint: 'This company buys companies across the country, inflates rates and then offers memberships at a so-called preferred rate.' Genstar backing means PE timeline pressure. Erdahl listed on BBB for multiple entities — spread thin across 40+ brands. Some negative Glassdoor reviews about post-acquisition culture changes.",
    threat: "VERY HIGH — They own THREE Portland brands already and are actively acquiring in OR/WA/ID. They acquired Barton Boys in Spokane, Gropp Heating in Moscow ID, and Evergreen Gas in WA. They are the #1 direct competitor for every target on our list.",
    website: "https://theseergroup.com",
    color: "#047857"
  },
  {
    id: 3, name: "Sun Glow, Inc.", hq: "Portland, OR", founded: 1972,
    backer: "Self-funded / Family-owned", funding: "Bootstrapped — reinvesting operating cash flow", ceo: "David Golobay (President), Dawn Golobay (Co-Owner)",
    employees: "50-100 (estimate)", brands: "Sun Glow brand + actively acquiring unnamed local companies",
    localBrands: ["Sun Glow Heating, Cooling, Electrical & Plumbing (Portland — HQ, multi-vertical)", "Unnamed acquisitions (company website states 'We are acquiring other businesses in the area')"],
    strategy: "Local Portland roll-up — expand from HVAC roots into plumbing and electrical through acquisition. 2nd generation family business (Ed & Sharon Golobay founded, David & Dawn now operate). Less institutional, more entrepreneurial.",
    strengths: "True local operator — Portland HQ, deep community ties. Multi-vertical already (HVAC + plumbing + electrical). No PE timeline pressure. 4.7 Google rating with 117 reviews. 54 years of brand equity. Already executing the exact same playbook we want to run.",
    weaknesses: "Self-funded means limited capital compared to Apex/SEER. No institutional back-office or training infrastructure. Smaller team means capacity constraints. Less sophisticated due diligence and integration process. No known technology platform.",
    threat: "MEDIUM-HIGH — They are the most similar competitor to WTD Ventures in terms of approach (local, founder-led, multi-vertical). They lack PE capital but have 54 years of relationships and reputation. They are actively acquiring but doing it quietly.",
    website: "https://sunglowinc.com",
    color: "#d97706"
  }
];

const VERTICALS = [...new Set(TARGETS.map(t => t.vertical))].sort();
const METROS = [...new Set(TARGETS.map(t => t.metro))].sort();
const TIERS = ["A", "B", "C"];
const tierColor = { A: "#FEE123", B: "#1b8a5a", C: "#666" };
const signalColor = { "VERY HIGH": "#FEE123", HIGH: "#1b8a5a", MEDIUM: "#888", LOW: "#555", NONE: "#8B2500" };

function Logo() {
  return <div style={{ width: 44, height: 44, background: "#154733", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #FEE123" }}>
    <svg width="28" height="24" viewBox="0 0 60 60"><path d="M4,52 L18,8 L30,32 L42,8 L56,52" fill="none" stroke="#FEE123" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round"/><path d="M24,18 L30,4 L36,18" fill="none" stroke="#FEE123" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.7"/></svg>
  </div>;
}

function Sec({ title, children, color = "#FEE123" }) {
  return <div style={{ marginBottom: 18 }}><div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color, fontWeight: 700, marginBottom: 8, paddingBottom: 4, borderBottom: "1px solid #1a1a1a" }}>{title}</div>{children}</div>;
}
function Row({ l, v, gold }) {
  return <div style={{ display: "flex", padding: "4px 0", fontSize: 13 }}><span style={{ color: "#666", width: 130, flexShrink: 0 }}>{l}</span><span style={{ color: gold ? "#FEE123" : "#ccc", fontWeight: gold ? 600 : 400, wordBreak: "break-all" }}>{v}</span></div>;
}
function Card({ children, accent }) {
  return <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, padding: 20, marginBottom: 16, borderLeft: accent ? `3px solid ${accent}` : undefined }}>{children}</div>;
}

function OutreachCard({ title, subtitle, badge, accent, casual, pe, local }) {
  const [tone, setTone] = useState("casual");
  const tones = [
    { id: "casual", label: "Casual" },
    { id: "local", label: "Local" },
    { id: "pe", label: "PE" },
  ];
  const content = { casual, pe, local };
  const toneColors = { casual: "#FEE123", pe: "#2563eb", local: "#1b8a5a" };
  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, padding: 20, marginBottom: 16, borderLeft: `3px solid ${accent || "#FEE123"}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: accent || "#FEE123", fontWeight: 700, letterSpacing: 0.5 }}>{title}</div>
          <div style={{ fontSize: 11, color: "#888" }}>{subtitle}</div>
        </div>
        {badge && <div style={{ fontSize: 10, background: "rgba(254,225,35,0.1)", color: "#FEE123", padding: "4px 10px", borderRadius: 4, fontWeight: 600 }}>{badge}</div>}
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {tones.map(t => (
          <button key={t.id} onClick={() => setTone(t.id)} style={{
            background: tone === t.id ? `${toneColors[t.id]}18` : "#111",
            color: tone === t.id ? toneColors[t.id] : "#555",
            border: tone === t.id ? `1px solid ${toneColors[t.id]}40` : "1px solid #1a1a1a",
            borderRadius: 6, padding: "6px 16px", fontSize: 11, fontWeight: 700,
            fontFamily: "'Rajdhani',sans-serif", cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase",
            transition: "all 0.15s"
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{ background: "#111", borderRadius: 8, padding: 20, borderTop: `2px solid ${toneColors[tone]}30` }}>
        <div style={{ fontSize: 13, color: "#ccc", lineHeight: 2, whiteSpace: "pre-wrap" }}>{content[tone]}</div>
      </div>
    </div>
  );
}

// ==================== TAB 1: BUSINESS PLAN ====================
function BusinessPlanTab() {
  const [planSection, setPlanSection] = useState("thesis");
  const sections = [
    { id: "thesis", label: "Thesis & Criteria" },
    { id: "playbook", label: "Value Creation" },
    { id: "portfolio", label: "Portfolio & Benchmarks" },
    { id: "sourcing", label: "GTM" },
  ];
  const sBtn = (id) => ({ background: planSection === id ? "linear-gradient(180deg, rgba(254,225,35,0.12), rgba(254,225,35,0.04))" : "#0a0a0a", color: planSection === id ? "#FEE123" : "#555", border: planSection === id ? "1px solid rgba(254,225,35,0.3)" : "1px solid #1a1a1a", borderRadius: 8, padding: "10px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", transition: "all 0.2s", letterSpacing: 1.5, textTransform: "uppercase" });

  return <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 48px" }}>
    {/* Sub-nav */}
    <div style={{ display: "flex", gap: 8, marginBottom: 28, padding: "0 0 16px", borderBottom: "1px solid #1a1a1a", flexWrap: "nowrap", overflowX: "auto" }}>
      {sections.map(s => <button key={s.id} onClick={() => setPlanSection(s.id)} style={{ ...sBtn(s.id), whiteSpace: "nowrap", flex: "1 1 0" }}>{s.label}</button>)}
    </div>

    {/* ===== THESIS ===== */}
    {planSection === "thesis" && <>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>The Thesis</div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 30, color: "#FEE123", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", lineHeight: 1.2, marginBottom: 12 }}>Build a regional portfolio of essential, non-discretionary service businesses</div>
        <div style={{ fontSize: 15, color: "#999", lineHeight: 1.8, maxWidth: 700 }}>Companies that homeowners and commercial property managers cannot defer indefinitely. The strategy: acquire established, analog-operated companies with strong reputations, then modernize operations, cross-sell across verticals, and create economies of scale that no standalone operator can match.</div>
      </div>

      {/* Three pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
        {[
          { icon: "01", title: "Acquire", desc: "Source off-market deals from retiring owners. Asset purchases, SBA 7(a) financing, seller notes. 2.5x-4.5x SDE.", color: "#FEE123" },
          { icon: "02", title: "Modernize", desc: "Deploy ServiceTitan, AI-powered marketing, route optimization. Unlock 8-15% EBITDA margin expansion.", color: "#1b8a5a" },
          { icon: "03", title: "Scale", desc: "Cross-sell across verticals, centralize back office, convert to recurring revenue via maintenance agreements.", color: "#FEE123" },
        ].map((p, i) => (
          <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, padding: 24, borderTop: `3px solid ${p.color}` }}>
            <div style={{ fontSize: 36, color: p.color, fontWeight: 800, opacity: 0.3, marginBottom: 8 }}>{p.icon}</div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Key metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {[
          { v: "$2M–$12M", l: "Revenue Sweet Spot", c: "#FEE123" },
          { v: "10+ yrs", l: "Operating History", c: "#1b8a5a" },
          { v: "4.0+", l: "Min Google Stars", c: "#FEE123" },
          { v: "55+", l: "Ideal Owner Age", c: "#1b8a5a" },
        ].map((m, i) => (
          <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 24, color: m.c, fontWeight: 800 }}>{m.v}</div>
            <div style={{ fontSize: 10, color: "#666", fontWeight: 600, letterSpacing: 0.5, marginTop: 4 }}>{m.l}</div>
          </div>
        ))}
      </div>

      {/* Why this works */}
      <Card accent="#154733">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#1b8a5a", fontWeight: 700, letterSpacing: 0.5, marginBottom: 16 }}>Why Home Services Roll-Ups Work</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { title: "Recession-Resistant Demand", desc: "Broken furnaces, burst pipes, and failed circuits don't wait for economic recoveries. These are non-discretionary, essential services." },
            { title: "Fragmented Market", desc: "90% of home service companies have under $5M in revenue. No dominant player exists in most MSAs. Perfect roll-up conditions." },
            { title: "Aging Owner Demographics", desc: "Average trade business owner is 58 years old. 65% have no succession plan. 10,000+ baby boomer owners exiting annually." },
            { title: "Massive Modernization Gap", desc: "Most companies still run on paper tickets and spreadsheets. Deploying ServiceTitan alone unlocks 8-15% margin improvement." },
          ].map((item, i) => <div key={i}>
            <div style={{ fontSize: 13, color: "#FEE123", fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>{item.desc}</div>
          </div>)}
        </div>
      </Card>

      {/* --- TARGET CRITERIA (merged into Thesis) --- */}
      <div style={{ marginTop: 36, paddingTop: 32, borderTop: "2px solid #1a1a1a" }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Target Profile</div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, color: "#FEE123", fontWeight: 700, letterSpacing: 1, marginBottom: 24 }}>What We're Looking For</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Industry Verticals", value: "HVAC, Electrical, Plumbing, Fire Protection, Roofing, Pest Control, Landscaping, Appliance Repair, Restoration, Janitorial, Foundation Repair, Garage Door, Locksmith", icon: "🔧" },
          { label: "Operating History", value: "10+ years continuous operation under current or prior ownership. Longer = more brand equity = higher value.", icon: "📅" },
          { label: "Revenue Range", value: "$1M – $30M annual revenue. Sweet spot: $2M – $12M. Sub-$5M eligible for SBA 7(a). $5M+ for platform deals.", icon: "💰" },
          { label: "Geography", value: "Oregon & SW Washington. Portland metro primary. Salem, Eugene, Vancouver WA, Bend as expansion targets.", icon: "📍" },
          { label: "Workforce", value: "10 – 150 W-2 employees. Avoid 1099-heavy models unless converting to W-2 is feasible. Union shops considered case-by-case.", icon: "👷" },
          { label: "Customer Base", value: "Mix of residential and light commercial preferred. Pure commercial acceptable if contracts are multi-year with renewal history.", icon: "🏠" },
          { label: "Reputation", value: "4.0+ Google stars with 100+ reviews. BBB accredited or equivalent. Minimal legal/regulatory red flags. Reviews mentioning long tenure.", icon: "⭐" },
          { label: "Analog Score", value: "HIGH preferred. Paper tickets, spreadsheets, legacy QuickBooks, no CRM, no ServiceTitan/Housecall Pro. This is a feature, not a bug.", icon: "📋" },
        ].map((item, i) => (
          <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
            <div style={{ fontSize: 14, color: "#FEE123", fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <Card accent="#FEE123">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#FEE123", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>Ideal Owner Profile — Highest-Probability Sellers</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { signal: "Age 55+", desc: "Founder-operated, approaching retirement, no energy for another growth cycle" },
            { signal: "No Succession Plan", desc: "No family members in the business, no internal candidate groomed for leadership" },
            { signal: "Life Event", desc: "Estate planning, divorce, partnership dissolution, health concerns, burnout" },
            { signal: "Stale Digital Presence", desc: "Website copyright 3+ years old, no social media posts in 12+ months, no Google Business posts" },
            { signal: "Coasting Operations", desc: "Steady revenue but no growth. No new hires. No marketing. Business runs itself but owner has checked out" },
            { signal: "Technology Gap", desc: "No online booking, no CRM, Craigslist job postings, 'call for estimate' only, check payments preferred" },
          ].map((s, i) => <div key={i} style={{ padding: "12px 0", borderBottom: i < 5 ? "1px solid #1a1a1a" : "none" }}>
            <div style={{ fontSize: 13, color: "#FEE123", fontWeight: 600, marginBottom: 2 }}>{s.signal}</div>
            <div style={{ fontSize: 11, color: "#777", lineHeight: 1.6 }}>{s.desc}</div>
          </div>)}
        </div>
      </Card>

      <Card accent="#1b8a5a">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#1b8a5a", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>Deal Structure</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            ["Structure", "Asset purchases preferred — avoid inheriting unknown liabilities"],
            ["Financing", "SBA 7(a) for sub-$5M deals. Private capital + seller financing for larger transactions"],
            ["Seller Financing", "10–20% earnout tied to transition milestones. Aligns incentives during handoff"],
            ["Transition Period", "6–12 month owner consulting agreement. Knowledge transfer is the #1 risk to manage"],
            ["Sub-$5M Multiples", "2.5x – 4.5x SDE (Seller's Discretionary Earnings)"],
            ["$5M+ Multiples", "4x – 6x EBITDA. Platform premium for businesses that can anchor a vertical"],
            ["RE Priority", "Businesses owning their facility are prioritized — SBA collateral, sale-leaseback optionality, hub potential"],
            ["Key Diligence", "Customer concentration, workforce stability, fleet condition, environmental liability (refrigerants, asbestos)"],
          ].map(([k, v], i) => <div key={i}>
            <div style={{ fontSize: 12, color: "#FEE123", fontWeight: 600 }}>{k}</div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{v}</div>
          </div>)}
        </div>
      </Card>
    </>}

    {/* ===== VALUE CREATION PLAYBOOK ===== */}
    {planSection === "playbook" && <>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Value Creation</div>
      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 26, color: "#FEE123", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>The Modernization Playbook</div>
      <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28, maxWidth: 700 }}>Every acquired company runs through the same value creation framework. The analog score determines where we start — higher analog = more levers to pull = more upside.</div>

      {[
        { title: "Operational Modernization", impact: "8–15% EBITDA improvement", timeline: "90 days", color: "#FEE123",
          details: "Deploy ServiceTitan or Housecall Pro for dispatching, invoicing, and CRM. Implement route optimization (saves 15-20% on fuel and windshield time). Automated appointment reminders reduce no-shows by 30%. Real-time technician tracking improves dispatch efficiency. Digital invoicing cuts A/R days from 30+ to same-day." },
        { title: "Cross-Selling Engine", impact: "15–25% revenue uplift", timeline: "6 months", color: "#1b8a5a",
          details: "An HVAC customer also needs electrical, plumbing, and pest control. Each additional vertical added to a household drops customer acquisition cost toward zero. A customer who called for a furnace repair gets a plumbing inspection upsell. Shared customer database across all portfolio companies enables automated cross-sell campaigns." },
        { title: "Shared Back Office", impact: "12–18% overhead reduction", timeline: "120 days", color: "#FEE123",
          details: "Centralize bookkeeping, HR/payroll, fleet management, insurance, procurement (volume discounts on parts/materials), call center, and marketing across all portfolio companies. A single AP/AR team, one insurance broker, one fleet manager. Procurement leverage: 15-25% discount on equipment and parts at scale." },
        { title: "Brand Arbitrage", impact: "Preserved goodwill + scale leverage", timeline: "Ongoing", color: "#1b8a5a",
          details: "Keep every local brand name and customer-facing identity. A 70-year-old plumbing company's name is worth more than any holding company brand. Consolidate under WTD Ventures only for financing, procurement, and back-office. Customers never know. Employees keep their identity. But vendors see a $30M+ combined entity." },
        { title: "Recurring Revenue Conversion", impact: "Highest-value lever in home services", timeline: "6–12 months", color: "#FEE123",
          details: "Convert one-time repair customers to annual maintenance agreements (AMAs). An HVAC tune-up agreement at $199/year × 5,000 customers = $1M predictable revenue. AMAs increase customer lifetime value 3-5x, reduce churn, smooth seasonal revenue, and create a predictable cash flow stream that dramatically increases business valuation." },
        { title: "Technician Recruitment & Retention", impact: "Reduced turnover, expanded capacity", timeline: "Ongoing", color: "#1b8a5a",
          details: "Offer career ladders, health benefits, 401(k), paid training, and cross-trade mobility that a standalone $4M shop cannot. Technicians can move from HVAC to electrical to plumbing within the portfolio. Apprenticeship programs feed the pipeline. Competitive compensation benchmarking across the portfolio ensures market-rate pay." },
        { title: "AI-Powered Operations", impact: "Next-gen competitive moat", timeline: "12 months", color: "#FEE123",
          details: "No competitor is deploying AI at the local level. Implement AI for: call routing and sentiment analysis, demand forecasting (predict breakdown calls before they happen), dynamic pricing optimization, automated review management and response, AI-generated marketing content, lead scoring and nurture sequences, predictive maintenance scheduling." },
      ].map((item, i) => (
        <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 12, padding: 24, marginBottom: 12, borderLeft: `3px solid ${item.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: 0.5, marginBottom: 4 }}>{item.title}</div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ fontSize: 11, color: "#FEE123", background: "rgba(254,225,35,0.1)", padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>{item.impact}</span>
                <span style={{ fontSize: 11, color: "#888", background: "rgba(255,255,255,0.05)", padding: "3px 10px", borderRadius: 4 }}>Timeline: {item.timeline}</span>
              </div>
            </div>
            <div style={{ fontSize: 28, color: item.color, fontWeight: 800, opacity: 0.2 }}>0{i + 1}</div>
          </div>
          <div style={{ fontSize: 13, color: "#999", lineHeight: 1.8 }}>{item.details}</div>
        </div>
      ))}
    </>}

    {/* ===== DEAL SOURCING METHODOLOGY ===== */}
    {planSection === "sourcing" && <>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Research Methodology</div>
      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 26, color: "#FEE123", fontWeight: 700, letterSpacing: 1, marginBottom: 24 }}>Three-Phase Deal Sourcing</div>

      {[
        { phase: "Phase 1", title: "Active Listings", desc: "Businesses explicitly for sale", color: "#FEE123", items: [
          { name: "Business-for-Sale Marketplaces", detail: "BizBuySell, BizQuest, BusinessBroker.net, LoopNet, DealStream (formerly MergerNetwork), Axial.net (lower middle market)" },
          { name: "Franchise Resales", detail: "Mr. Electric, One Hour Heating & Air, Benjamin Franklin Plumbing, Neighborly brands, Home Franchise Concepts — resale units come with built-in SOPs" },
          { name: "SBA Loan Data", detail: "SBA loan databases indicate businesses that took acquisition loans — signals a prior sale and possible re-sale cycle" },
          { name: "Broker Networks", detail: "M&A brokers specializing in home services and trades in Portland/OR/WA. Get on buyer lists for every broker in market." },
        ]},
        { phase: "Phase 2", title: "Off-Market Prospecting", desc: "This is where the alpha is — most of the best acquisitions are never listed", color: "#1b8a5a", items: [
          { name: "Owner Age & Succession Signals", detail: "Cross-reference state SOS filings with LinkedIn. Owners 55+ with no family in the business. Same registered agent for 15+ years." },
          { name: "Stale Digital Presence", detail: "Old WordPress themes, copyright footer dated 3+ years ago, no social media in 12+ months, steady reviews but owner has checked out on growth." },
          { name: "Technology Gap Signals", detail: "'Call for estimate' only (no online booking), no CRM, Craigslist job postings, no fleet GPS/tracking visible, check-only payments." },
          { name: "State Licensing Databases", detail: "Oregon CCB, WA L&I — filter for licenses issued 10+ years ago, active status, cross-reference with owner name and age." },
          { name: "Review Mining", detail: "Google, Yelp, BBB, Angi — look for reviews mentioning long tenure ('been using them 15 years'), quality praise, but also scheduling/communication complaints (signal of ops breakdown = modernization opportunity)." },
          { name: "Competitive Density Mapping", detail: "Identify MSAs with fragmented competition (many small operators, no dominant player). These are ideal roll-up geographies." },
        ]},
        { phase: "Phase 3", title: "Deep Qualification", desc: "Investment-grade intelligence on every qualified candidate", color: "#FEE123", items: [
          { name: "Financial Estimation", detail: "Employee count (LinkedIn, job postings), fleet size (Google Maps satellite), industry benchmarks (ACCA, PHCC, IEC). Cross-reference Inc. 5000, local biz journals." },
          { name: "Legal & Regulatory", detail: "State court records, OSHA violations, EPA enforcement, BBB complaints, state AG consumer complaints, active lawsuits." },
          { name: "Workforce Stability", detail: "Glassdoor/Indeed reviews, average tenure (LinkedIn), job posting velocity (turnover vs. growth — disambiguate)." },
          { name: "Customer Concentration", detail: "Revenue spread across many small customers (ideal) vs. concentrated in few large contracts (risky unless multi-year with renewal)." },
          { name: "Real Estate Ownership", detail: "County assessor records. Own = additional asset value + SBA collateral + sale-leaseback optionality. Lease = check term and transferability." },
          { name: "Fleet & Equipment", detail: "Visible fleet size and condition (Google Maps, Facebook photos). Branded vs. unbranded vehicles (branded = stronger local brand equity)." },
        ]},
      ].map((phase, pi) => (
        <div key={pi} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 10, background: phase.color === "#FEE123" ? "rgba(254,225,35,0.1)" : "rgba(21,71,51,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: phase.color, fontWeight: 800, border: `1px solid ${phase.color}40` }}>{phase.phase.split(" ")[1]}</div>
            <div>
              <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>{phase.title}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{phase.desc}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginLeft: 60 }}>
            {phase.items.map((item, i) => (
              <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 12, color: phase.color, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "#777", lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* --- OUTREACH TEMPLATES (merged into GTM) --- */}
      <div style={{ marginTop: 32, paddingTop: 28, borderTop: "2px solid #1a1a1a" }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Outreach Templates</div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, color: "#FEE123", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Communication Playbook</div>
        <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 24, maxWidth: 700 }}>Confidentiality is paramount. Never reveal the full roll-up strategy. Position initial contact as "exploring strategic partnership opportunities."</div>
      </div>

      <OutreachCard
        title="Direct Mail — Owner-to-Owner Letter"
        subtitle="Handwritten envelope, personal letterhead. Highest-converting outreach method."
        badge="HIGHEST CONVERSION"
        accent="#FEE123"
        casual={"[Owner First Name] —\n\nHey, we've been fans of [Company Name] for a while and wanted to reach out. Our team is based right here in Portland and we're looking to invest in one great service business in the area — not a PE fund, just a group of local operators with capital. If you've ever thought about what's next, we'd love to grab coffee sometime.\n\n[Your Name]\n[Phone]"}
        pe={"Dear [Owner First Name],\n\nOn behalf of WTD Ventures, I'm writing to express our interest in exploring a potential strategic partnership with [Company Name]. We are a Portland-based investment firm focused exclusively on acquiring and growing premier home services brands in the Pacific Northwest.\n\nYour company's [XX]-year track record of operational excellence, strong customer satisfaction, and market leadership in [vertical] makes [Company Name] an ideal partner for our platform. We provide capital, operational resources, and growth infrastructure while preserving the brand identity, team, and culture that built your reputation.\n\nWe would welcome the opportunity to introduce ourselves and discuss how a partnership could support your goals — whether that involves growth capital, succession planning, or long-term wealth diversification. All conversations are held in strict confidence.\n\nPlease don't hesitate to reach out at your convenience. We are happy to meet at your office or any location comfortable for you.\n\nRespectfully,\n[Your Name]\nManaging Partner, WTD Ventures\n[Phone] · [Email]"}
        local={"Dear [Owner First Name],\n\nOur team grew up watching companies like [Company Name] take care of families in this community. What you've built over [XX] years — the reputation, the trust, the team — that doesn't happen by accident. It happens because you showed up every single day and did the work.\n\nWe're based right here in Portland and our group is looking to carry forward the legacy of one or two businesses like yours here in Oregon. We're not a fund from out of state — we're local, we're well-capitalized, and we have an experienced team of operators, finance professionals, and technologists who believe the best businesses in Portland deserve ownership that will protect what you built while investing in the people and tools to help them grow even further.\n\nIf there ever comes a day when you're thinking about what the next chapter looks like — retirement, slowing down, or just knowing your people are taken care of — we'd be honored to have that conversation with you. No pressure, no timeline, just a couple of local business owners talking over coffee.\n\nWith respect,\n[Your Name]\nWTD Ventures · Portland, OR\n[Phone] · [Email]"}
      />

      <OutreachCard
        title="Broker Outreach Email"
        subtitle="Get on every broker's buyer list in the Portland/OR/WA market."
        accent="#1b8a5a"
        casual={"Subject: Looking for home services deals in Portland\n\nHey [Broker Name] —\n\nI'm actively buying service businesses in the Portland/Vancouver area — HVAC, plumbing, electrical, that kind of thing. $1M-$15M revenue, owner-operated. Got anything that might fit? Happy to send over my buyer profile.\n\n[Your Name]\n[Phone]"}
        pe={"Subject: Acquisition Criteria — Residential & Commercial Services, Portland MSA\n\nDear [Broker Name],\n\nWTD Ventures is a Portland-based acquisition firm actively seeking established home services companies in the Oregon and SW Washington markets. We are currently evaluating opportunities that meet the following investment criteria:\n\n• Verticals: HVAC, electrical, plumbing, fire protection, and adjacent trade services\n• Revenue: $1M – $15M annual revenue\n• History: 10+ years of continuous operation\n• Structure: Asset purchases preferred; SBA 7(a) and conventional financing available\n• Transition: Flexible on owner involvement post-close\n\nWe have completed extensive market analysis of the Portland home services landscape and are prepared to move efficiently from initial review to LOI. We are happy to provide a detailed buyer profile, proof of funds, and references from prior advisors.\n\nPlease add us to your active buyer list for current and future mandates matching these criteria. We would also welcome a brief introductory call at your convenience.\n\nBest regards,\n[Your Name]\nManaging Partner, WTD Ventures\n[Phone] · [Email]"}
        local={"Subject: Portland-based team looking for the right home services business\n\nHi [Broker Name],\n\nWe're a Portland-based acquisition team focused on established service businesses in the Oregon and SW Washington market. Our group includes experienced operators, finance professionals, and technologists — all local, all well-capitalized, and specifically focused on companies where the owner has built something great and wants to see it continue under people who care about the team and the community.\n\nWhat we're looking for:\n• HVAC, plumbing, electrical — 10+ years, $1M-$15M revenue\n• Owner-operated, flexible on transition\n• We close with SBA + private capital\n\nWe're not in a rush and we're not trying to strip anything down — we want to invest in the business and grow it. If you have anything that might be the right fit, or if you'd be open to a quick call, we'd really appreciate it.\n\nThanks,\n[Your Name]\nWTD Ventures · Portland, OR\n[Phone]"}
      />

      <Card accent="#FEE123">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#FEE123", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>Key Outreach Principles</div>
        {[
          { rule: "Lead with admiration, not ambition", desc: "The owner built this business over decades. Lead with genuine respect for what they created." },
          { rule: "Differentiate from PE immediately", desc: "'I'm not a private equity fund or a tire-kicker.' Every owner has been cold-called by PE firms. Break the pattern in sentence two." },
          { rule: "Coffee, not contracts", desc: "First meeting is just coffee. No LOI, no financials, no due diligence. Two business owners talking about what comes next." },
          { rule: "Never reveal the roll-up", desc: "Position as 'exploring opportunities to acquire and invest in one or two great businesses.' The portfolio thesis stays internal." },
          { rule: "Follow up without pressure", desc: "No response? Handwritten note 3 weeks later. Holiday card. Another letter 6 months later. These are 12-18 month relationship sales." },
        ].map((item, i) => <div key={i} style={{ padding: "10px 0", borderBottom: i < 4 ? "1px solid #111" : "none" }}>
          <div style={{ fontSize: 13, color: "#FEE123", fontWeight: 600, marginBottom: 2 }}>{item.rule}</div>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>{item.desc}</div>
        </div>)}
      </Card>
    </>}

    {/* ===== PORTFOLIO STRATEGY ===== */}
    {planSection === "portfolio" && <>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Portfolio Strategy</div>
      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 26, color: "#FEE123", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Cross-Sell & Portfolio Fit</div>
      <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28, maxWidth: 700 }}>Every target is evaluated as a node in the portfolio network — not just as a standalone acquisition.</div>

      {/* Cross-sell matrix */}
      <Card accent="#FEE123">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#FEE123", fontWeight: 700, letterSpacing: 0.5, marginBottom: 16 }}>Cross-Sell Revenue Matrix</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>Every customer who calls for one service is a warm lead for every other vertical. Industry benchmark: 15-25% revenue uplift from cross-selling adjacent services to existing customer base.</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead>
              <tr>{["Customer Needs →", "HVAC", "Electrical", "Plumbing", "Fire Prot.", "Pest Control"].map((h, i) => <th key={i} style={{ padding: "8px 10px", textAlign: "left", color: i === 0 ? "#888" : "#FEE123", borderBottom: "1px solid #1a1a1a", fontWeight: 600 }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                ["HVAC Customer", "—", "Panel upgrades", "Gas lines", "Sprinklers", "Duct pests"],
                ["Electrical Customer", "Heat pump", "—", "Water heater", "Alarm wiring", "Attic pests"],
                ["Plumbing Customer", "Furnace", "Outlet install", "—", "Backflow", "Drain pests"],
                ["New Homeowner", "Full HVAC", "Full electrical", "Full plumbing", "Code inspect", "Prevention"],
              ].map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} style={{ padding: "8px 10px", color: ci === 0 ? "#ccc" : cell === "—" ? "#333" : "#1b8a5a", borderBottom: "1px solid #111", fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Seasonal complement */}
      <Card accent="#1b8a5a">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#1b8a5a", fontWeight: 700, letterSpacing: 0.5, marginBottom: 16 }}>Seasonal Revenue Complement</div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>Multi-vertical portfolio smooths seasonal revenue cycles. No single-vertical dip can tank the combined entity.</div>
        <div style={{ display: "grid", gridTemplateColumns: "100px repeat(4, 1fr)", gap: 4, fontSize: 11 }}>
          <div style={{ color: "#666" }}></div>
          {["Winter", "Spring", "Summer", "Fall"].map(s => <div key={s} style={{ color: "#888", textAlign: "center", fontWeight: 600 }}>{s}</div>)}
          {[
            ["HVAC", 5, 3, 5, 4],
            ["Electrical", 3, 4, 3, 4],
            ["Plumbing", 4, 4, 3, 3],
            ["Roofing", 1, 5, 4, 5],
            ["Pest Control", 2, 5, 5, 3],
            ["Landscaping", 1, 5, 5, 3],
          ].map(([label, ...vals], ri) => <React.Fragment key={ri}>
            <div style={{ color: "#ccc", fontWeight: 600, paddingTop: 6 }}>{label}</div>
            {vals.map((v, vi) => <div key={vi} style={{ textAlign: "center", paddingTop: 4 }}>
              <div style={{ height: 8, borderRadius: 2, background: v >= 4 ? "#FEE123" : v >= 3 ? "#1b8a5a" : "#222", opacity: v >= 4 ? 1 : v >= 3 ? 0.7 : 0.3 }} />
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{v === 5 ? "Peak" : v === 4 ? "High" : v === 3 ? "Mid" : v === 2 ? "Low" : "Slow"}</div>
            </div>)}
          </React.Fragment>)}
        </div>
      </Card>

      {/* Portfolio evaluation criteria */}
      <Card accent="#FEE123">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#FEE123", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>Portfolio Fit Evaluation — Every Target Gets Scored On:</div>
        {[
          { q: "Vertical Adjacency", desc: "Which other portfolio verticals can cross-sell to this company's customers?" },
          { q: "Geographic Overlap", desc: "Does this target share a service area with existing companies? Overlap = immediate cross-sell." },
          { q: "Seasonal Complement", desc: "Does this business's peak season offset another company's slow season?" },
          { q: "Shared Resource Potential", desc: "Can technicians cross-train? Can warehouse/yard be shared? Can call volume route through central dispatch?" },
          { q: "Customer List Value", desc: "Estimated unique residential + commercial customer records. Each record = cross-sell + recurring revenue potential." },
        ].map((item, i) => <div key={i} style={{ padding: "10px 0", borderBottom: i < 4 ? "1px solid #111" : "none" }}>
          <div style={{ fontSize: 13, color: "#FEE123", fontWeight: 600 }}>{item.q}</div>
          <div style={{ fontSize: 12, color: "#777", lineHeight: 1.6 }}>{item.desc}</div>
        </div>)}
      </Card>

      {/* Estimated portfolio economics */}
      <Card accent="#154733">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#1b8a5a", fontWeight: 700, letterSpacing: 0.5, marginBottom: 16 }}>Illustrative Portfolio Economics — First 3 Acquisitions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { v: "$8M–$20M", l: "Combined Revenue" },
            { v: "50–120", l: "Combined Employees" },
            { v: "$1.5M–$3M", l: "Cross-Sell Uplift (yr 2)" },
            { v: "$800K–$1.5M", l: "Back Office Savings" },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: "center", padding: 12, background: "#111", borderRadius: 8 }}>
              <div style={{ fontSize: 20, color: "#FEE123", fontWeight: 800 }}>{m.v}</div>
              <div style={{ fontSize: 10, color: "#666", fontWeight: 600, marginTop: 4 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* --- BENCHMARKS (merged into Portfolio) --- */}
      <div style={{ marginTop: 36, paddingTop: 32, borderTop: "2px solid #1a1a1a" }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#1b8a5a", letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Industry Benchmarks</div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 22, color: "#FEE123", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>Financial & Operational Health Metrics</div>
        <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28, maxWidth: 700 }}>These benchmarks determine acquisition attractiveness and post-acquisition upside. A "Low" tier company with strong brand equity is the ideal target — maximum modernization leverage.</div>
      </div>

      {/* Residential benchmarks */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#FEE123" }} />
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>Residential Service Companies</div>
          <div style={{ fontSize: 11, color: "#888", background: "#111", padding: "3px 10px", borderRadius: 4 }}>HVAC, Plumbing, Electrical — homeowner-focused</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#888", borderBottom: "2px solid #1a1a1a", fontWeight: 600, width: "28%" }}>Metric</th>
                <th style={{ padding: "10px 12px", textAlign: "center", color: "#FEE123", borderBottom: "2px solid #1a1a1a", fontWeight: 700, background: "rgba(254,225,35,0.05)" }}>Best in Class</th>
                <th style={{ padding: "10px 12px", textAlign: "center", color: "#1b8a5a", borderBottom: "2px solid #1a1a1a", fontWeight: 700 }}>Average</th>
                <th style={{ padding: "10px 12px", textAlign: "center", color: "#8B2500", borderBottom: "2px solid #1a1a1a", fontWeight: 700 }}>Low / Red Flag</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#555", borderBottom: "2px solid #1a1a1a", fontWeight: 600, width: "24%" }}>Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Gross Margin", "50–60%", "40–50%", "Below 35%", "Pricing power & job cost control"],
                ["Net Profit / EBITDA Margin", "15–25%", "8–12%", "Below 5%", "True business health. Below 5% = just buying yourself a job"],
                ["Revenue per Technician", "$400K–$1M+", "$250K–$400K", "Below $200K", "Field productivity & upsell effectiveness"],
                ["Maintenance Agreement Rate", "30–50%+ of customers", "10–20%", "Below 5%", "Recurring revenue = higher valuation multiple"],
                ["Customer Retention (2-yr)", "50–70% return", "40–50%", "Below 30%", "Repeat business is 5-7x cheaper than new acquisition"],
                ["Avg Ticket Size", "$450–$800+", "$300–$450", "Below $250", "Indicates upsell capability & pricing sophistication"],
                ["Customer Lifetime Value", "$3,000–$5,000+", "$1,500–$3,000", "Below $1,000", "Total revenue per customer relationship"],
                ["Customer Acquisition Cost", "Below $100", "$150–$250", "Above $400", "Lower = healthier marketing engine"],
                ["LTV:CAC Ratio", "5:1 or better", "3:1", "Below 2:1", "Below 3:1 = unsustainable marketing spend"],
                ["Call Booking Rate", "50–65%", "40–50%", "Below 30%", "Phone conversion — CSR training impact"],
                ["First-Time Fix Rate", "85–95%", "70–85%", "Below 65%", "Every callback turns a profitable job into a loss"],
                ["Tech Utilization Rate", "75–85%", "60–75%", "Below 55%", "Billable hours / available hours"],
                ["Revenue Mix (Service vs Install)", "60/40 service-heavy", "50/50", "70%+ install", "Service carries higher margins & more recurring revenue"],
                ["Overhead Rate", "Below 25%", "30–40%", "Above 45%", "Admin bloat kills net margin"],
                ["Employee Turnover", "Below 15%", "20–30%", "Above 40%", "Turnover destroys customer relationships & training investment"],
              ].map((row, ri) => <tr key={ri} style={{ borderBottom: "1px solid #111" }}>
                <td style={{ padding: "10px 12px", color: "#fff", fontWeight: 600 }}>{row[0]}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#FEE123", fontWeight: 600, background: "rgba(254,225,35,0.03)" }}>{row[1]}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#1b8a5a" }}>{row[2]}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#8B2500" }}>{row[3]}</td>
                <td style={{ padding: "10px 12px", color: "#555", fontSize: 11 }}>{row[4]}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commercial benchmarks */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: "#1b8a5a" }} />
          <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>Commercial Service Companies</div>
          <div style={{ fontSize: 11, color: "#888", background: "#111", padding: "3px 10px", borderRadius: 4 }}>HVAC, Electrical, Fire Protection — property manager & GC focused</div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#888", borderBottom: "2px solid #1a1a1a", fontWeight: 600, width: "28%" }}>Metric</th>
                <th style={{ padding: "10px 12px", textAlign: "center", color: "#FEE123", borderBottom: "2px solid #1a1a1a", fontWeight: 700, background: "rgba(254,225,35,0.05)" }}>Best in Class</th>
                <th style={{ padding: "10px 12px", textAlign: "center", color: "#1b8a5a", borderBottom: "2px solid #1a1a1a", fontWeight: 700 }}>Average</th>
                <th style={{ padding: "10px 12px", textAlign: "center", color: "#8B2500", borderBottom: "2px solid #1a1a1a", fontWeight: 700 }}>Low / Red Flag</th>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "#555", borderBottom: "2px solid #1a1a1a", fontWeight: 600, width: "24%" }}>Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Gross Margin", "35–45%", "25–35%", "Below 20%", "Tighter than residential — competitive bid environment"],
                ["Net Profit / EBITDA Margin", "10–18%", "5–10%", "Below 3%", "Commercial EBITDA averages ~3% industry-wide per First Research"],
                ["Revenue per Technician", "$300K–$500K", "$200K–$300K", "Below $150K", "Longer job durations offset by higher contract values"],
                ["Contract Renewal Rate", "85–95%", "70–85%", "Below 60%", "Multi-year contracts = revenue visibility. Low renewal = relationship risk"],
                ["Avg Contract Value (ACV)", "$5K–$50K+/yr", "$2K–$5K/yr", "Below $1K/yr", "Higher ACV = fewer customers needed to hit revenue targets"],
                ["Customer Concentration", "No client >10% of rev", "Top client 15–20%", "Top client >25%", "High concentration = existential risk if that client leaves"],
                ["Avg Ticket / Job Size", "$800–$5,000+", "$500–$1,500", "Below $400", "Commercial jobs are larger but margins are thinner"],
                ["Customer Lifetime Value", "$15K–$100K+", "$8K–$15K", "Below $5K", "Multi-year contracts with renewal create massive LTV"],
                ["Backlog / Pipeline", "3–6 months booked", "1–3 months", "Below 1 month", "Revenue visibility & scheduling predictability"],
                ["Bid Win Rate", "30–45%", "15–30%", "Below 10%", "Below 10% = pricing too high or wrong relationships"],
                ["Days Sales Outstanding", "Below 30 days", "30–45 days", "Above 60 days", "Commercial clients pay slower — cash flow killer"],
                ["Employee Turnover", "Below 12%", "15–25%", "Above 30%", "Skilled commercial techs are harder to replace"],
              ].map((row, ri) => <tr key={ri} style={{ borderBottom: "1px solid #111" }}>
                <td style={{ padding: "10px 12px", color: "#fff", fontWeight: 600 }}>{row[0]}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#FEE123", fontWeight: 600, background: "rgba(254,225,35,0.03)" }}>{row[1]}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#1b8a5a" }}>{row[2]}</td>
                <td style={{ padding: "10px 12px", textAlign: "center", color: "#8B2500" }}>{row[3]}</td>
                <td style={{ padding: "10px 12px", color: "#555", fontSize: 11 }}>{row[4]}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investment Hypothesis */}
      <Card accent="#FEE123">
        <div style={{ fontSize: 18, color: "#FEE123", fontWeight: 700, marginBottom: 16 }}>Investment Hypothesis: Residential vs. Commercial</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ background: "#111", borderRadius: 10, padding: 20, borderTop: "3px solid #FEE123" }}>
            <div style={{ fontSize: 14, color: "#FEE123", fontWeight: 700, marginBottom: 12 }}>Residential — Primary Target</div>
            {[
              { pro: true, text: "Higher gross margins (40-60% vs 25-35%)" },
              { pro: true, text: "Maintenance agreement upside (30-50% penetration = predictable revenue)" },
              { pro: true, text: "Cross-sell revenue potential — every homeowner needs HVAC + plumbing + electrical" },
              { pro: true, text: "Lower customer concentration risk — thousands of homeowners vs. few large accounts" },
              { pro: true, text: "Faster payment cycles (same-day vs. 30-60 day terms)" },
              { pro: true, text: "Higher valuation multiples for service-heavy revenue mix" },
              { pro: true, text: "AI and digital marketing create massive competitive moat — most competitors are analog" },
              { pro: false, text: "Seasonal revenue swings (mitigated by multi-vertical portfolio)" },
              { pro: false, text: "Higher marketing spend required for customer acquisition" },
              { pro: false, text: "Individual ticket sizes are smaller" },
            ].map((item, i) => <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 12 }}>
              <span style={{ color: item.pro ? "#1b8a5a" : "#8B2500", flexShrink: 0 }}>{item.pro ? "✓" : "✗"}</span>
              <span style={{ color: "#999" }}>{item.text}</span>
            </div>)}
          </div>
          <div style={{ background: "#111", borderRadius: 10, padding: 20, borderTop: "3px solid #1b8a5a" }}>
            <div style={{ fontSize: 14, color: "#1b8a5a", fontWeight: 700, marginBottom: 12 }}>Commercial — Strategic Add-On</div>
            {[
              { pro: true, text: "Larger contract values ($5K-$50K+/yr vs. $200-$500/visit)" },
              { pro: true, text: "Multi-year contracts create revenue visibility" },
              { pro: true, text: "Higher customer lifetime value ($15K-$100K+ vs. $3K-$5K)" },
              { pro: true, text: "Less seasonal — commercial HVAC runs year-round" },
              { pro: true, text: "Government/institutional contracts add stability" },
              { pro: false, text: "Lower margins (25-35% gross, ~3% industry EBITDA average)" },
              { pro: false, text: "Customer concentration risk — losing one client can tank revenue" },
              { pro: false, text: "Competitive bid environment compresses pricing" },
              { pro: false, text: "Slower payment terms (30-60+ days DSO)" },
              { pro: false, text: "Dependent on new construction cycles for install revenue" },
              { pro: false, text: "Union labor requirements in some markets add cost complexity" },
            ].map((item, i) => <div key={i} style={{ display: "flex", gap: 8, padding: "4px 0", fontSize: 12 }}>
              <span style={{ color: item.pro ? "#1b8a5a" : "#8B2500", flexShrink: 0 }}>{item.pro ? "✓" : "✗"}</span>
              <span style={{ color: "#999" }}>{item.text}</span>
            </div>)}
          </div>
        </div>
      </Card>

      <Card accent="#154733">
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#FEE123", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>The Verdict</div>
        <div style={{ fontSize: 14, color: "#ccc", lineHeight: 1.8, marginBottom: 16 }}>
          Residential service companies are the superior acquisition target for the WTD Ventures thesis. The math is clear: higher margins, more modernization upside, stronger recurring revenue potential, lower concentration risk, and faster cash conversion cycles.
        </div>
        <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 16 }}>
          The ideal portfolio is 70-80% residential / 20-30% commercial. Pure residential companies are the first acquisitions — they generate the cash flow and margin expansion that funds future commercial add-ons. Commercial capabilities (particularly fire protection and large-scale HVAC) are added later to capture the LTV upside of multi-year contracts without taking on the concentration and margin risks as the primary revenue base.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { metric: "Target Gross Margin", residential: "50%+", commercial: "30%+", verdict: "Residential 1.7x" },
            { metric: "Target EBITDA", residential: "15-20%", commercial: "8-12%", verdict: "Residential 1.5x" },
            { metric: "Target LTV:CAC", residential: "5:1+", commercial: "4:1+", verdict: "Residential edge" },
            { metric: "Revenue Predictability", residential: "30%+ on AMAs", commercial: "70%+ contracted", verdict: "Commercial edge" },
          ].map((item, i) => (
            <div key={i} style={{ background: "#0a0a0a", borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#666", marginBottom: 6 }}>{item.metric}</div>
              <div style={{ fontSize: 12, color: "#FEE123", fontWeight: 600 }}>Resi: {item.residential}</div>
              <div style={{ fontSize: 12, color: "#1b8a5a" }}>Comm: {item.commercial}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>{item.verdict}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card accent="#FEE123">
        <div style={{ fontSize: 14, color: "#FEE123", fontWeight: 700, marginBottom: 8 }}>Acquisition Scoring Impact</div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>
          When evaluating targets, benchmark their financials against the "Average" column above. A company operating at "Low/Red Flag" levels across multiple metrics but with strong brand equity and high analog score represents the ideal WTD Ventures acquisition — the gap between their current performance and "Best in Class" IS the value creation opportunity. A company already at "Best in Class" has less margin expansion upside, which compresses the return on investment and the premium a buyer should be willing to pay.
        </div>
      </Card>
    </>}

  </div>;
}

// ==================== TAB 2: TARGET PIPELINE ====================
function PipelineTab() {
  const [filters, setFilters] = useState({ vertical: "All", metro: "All", tier: "All", searchText: "" });
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [sortBy, setSortBy] = useState("tier");

  const filtered = useMemo(() => {
    let r = TARGETS.filter(t => {
      if (filters.vertical !== "All" && t.vertical !== filters.vertical) return false;
      if (filters.metro !== "All" && t.metro !== filters.metro) return false;
      if (filters.tier !== "All" && t.tier !== filters.tier) return false;
      if (filters.searchText) {
        const s = filters.searchText.toLowerCase();
        return t.company.toLowerCase().includes(s) || t.location.toLowerCase().includes(s) || t.vertical.toLowerCase().includes(s) || t.owners.toLowerCase().includes(s) || t.notes.toLowerCase().includes(s);
      }
      return true;
    });
    if (sortBy === "tier") r = _.orderBy(r, ["tier", "yearsInBusiness"], ["asc", "desc"]);
    else if (sortBy === "revenue") r = _.orderBy(r, "estRevenueNum", "desc");
    else if (sortBy === "years") r = _.orderBy(r, "yearsInBusiness", "desc");
    else if (sortBy === "analog") r = _.orderBy(r, "analogScore", "desc");
    return r;
  }, [filters, sortBy]);

  const stats = useMemo(() => ({
    total: TARGETS.length,
    tierA: TARGETS.filter(t => t.tier === "A").length,
    tierC: TARGETS.filter(t => t.tier === "C").length,
    ownersFound: TARGETS.filter(t => !t.owners.includes("Not publicly") && !t.owners.includes("Research needed")).length,
    avgAnalog: (TARGETS.reduce((a, t) => a + t.analogScore, 0) / TARGETS.length).toFixed(1),
  }), []);

  const sel = { background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, color: "#e0e0e0", padding: "8px 12px", fontSize: 13, fontFamily: "'Barlow',sans-serif", cursor: "pointer", outline: "none", minWidth: 120 };
  const F = ({ label, children }) => <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#777", fontWeight: 600 }}>{label}</span>{children}</div>;

  return <div>
    <div style={{ padding: "16px 24px", display: "flex", gap: 28, flexWrap: "wrap" }}>
      {[{ v: stats.total, l: "Total Targets", c: "#fff" }, { v: stats.tierA, l: "Tier A", c: "#FEE123" }, { v: stats.tierC, l: "PE-Acquired", c: "#8B2500" }, { v: stats.ownersFound, l: "Owners ID'd", c: "#1b8a5a" }, { v: stats.avgAnalog + "/10", l: "Avg Analog", c: "#fff" }].map((s, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, color: s.c, fontWeight: 800 }}>{s.v}</div>
          <div style={{ fontSize: 10, color: "#666", fontWeight: 600, letterSpacing: 0.5 }}>{s.l}</div>
        </div>
      ))}
    </div>

    <div style={{ padding: "8px 24px 12px", borderBottom: "1px solid #1a1a1a", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
      <F label="Search"><input type="text" placeholder="Company, owner, keyword..." value={filters.searchText} onChange={e => setFilters(p => ({ ...p, searchText: e.target.value }))} style={{ ...sel, minWidth: 200 }} /></F>
      <F label="Vertical"><select value={filters.vertical} onChange={e => setFilters(p => ({ ...p, vertical: e.target.value }))} style={sel}><option value="All">All</option>{VERTICALS.map(v => <option key={v}>{v}</option>)}</select></F>
      <F label="Metro"><select value={filters.metro} onChange={e => setFilters(p => ({ ...p, metro: e.target.value }))} style={sel}><option value="All">All</option>{METROS.map(s => <option key={s}>{s}</option>)}</select></F>
      <F label="Tier"><select value={filters.tier} onChange={e => setFilters(p => ({ ...p, tier: e.target.value }))} style={sel}><option value="All">All</option>{TIERS.map(t => <option key={t}>Tier {t}</option>)}</select></F>
      <F label="Sort"><select value={sortBy} onChange={e => setSortBy(e.target.value)} style={sel}><option value="tier">Tier</option><option value="revenue">Revenue</option><option value="years">Years</option><option value="analog">Analog Score</option></select></F>
      {(filters.vertical !== "All" || filters.metro !== "All" || filters.tier !== "All" || filters.searchText) && (
        <button onClick={() => setFilters({ vertical: "All", metro: "All", tier: "All", searchText: "" })} style={{ background: "transparent", border: "1px solid #8B2500", color: "#ff6b47", borderRadius: 6, padding: "8px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'Barlow',sans-serif", fontWeight: 600 }}>Clear</button>
      )}
    </div>

    <div style={{ display: "flex", minHeight: "calc(100vh - 240px)" }}>
      <div style={{ flex: selectedTarget ? "0 0 460px" : 1, overflow: "auto", maxHeight: "calc(100vh - 240px)" }}>
        {filtered.length === 0 && <div style={{ padding: 48, textAlign: "center", color: "#555" }}><div style={{ fontSize: 32, marginBottom: 8 }}>∅</div><div>No targets match filters</div></div>}
        {filtered.map(t => (
          <div key={t.id} onClick={() => setSelectedTarget(selectedTarget?.id === t.id ? null : t)} style={{
            padding: "14px 24px", borderBottom: "1px solid #141414", cursor: "pointer",
            background: selectedTarget?.id === t.id ? "rgba(21,71,51,0.15)" : "transparent",
            borderLeft: selectedTarget?.id === t.id ? "3px solid #FEE123" : "3px solid transparent",
            transition: "all 0.15s"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: t.tier === "A" ? "#000" : t.tier === "B" ? "#fff" : "#ccc", background: tierColor[t.tier], padding: "2px 8px", borderRadius: 4, letterSpacing: 1 }}>TIER {t.tier}</span>
                  <span style={{ fontSize: 10, background: "#154733", color: "#8fdfb4", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>{t.vertical}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t.company}</div>
                <div style={{ fontSize: 11, color: "#777" }}>{t.location} · Est. {t.founded} ({t.yearsInBusiness} yrs) · {t.estRevenue}</div>
                <div style={{ fontSize: 11, color: t.owners.includes("Research needed") ? "#555" : "#FEE123", marginTop: 2, fontWeight: t.owners.includes("Research needed") ? 400 : 600 }}>
                  {t.owners.includes("Research needed") ? "Owner: Research needed" : "Owner: " + t.owners.split("—")[0].split("(")[0].trim()}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#FEE123" }}>Analog {t.analogScore}/10</div>
                <div style={{ fontSize: 10, color: "#777" }}>⭐ {t.googleRating} ({t.reviewCount})</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTarget && (
        <div style={{ flex: 1, borderLeft: "1px solid #1a1a1a", overflow: "auto", maxHeight: "calc(100vh - 240px)", background: "#080808" }}>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: selectedTarget.tier === "A" ? "#000" : "#fff", background: tierColor[selectedTarget.tier], padding: "3px 10px", borderRadius: 4, letterSpacing: 1 }}>TIER {selectedTarget.tier}</span>
                  <span style={{ fontSize: 11, background: "#154733", color: "#8fdfb4", padding: "3px 10px", borderRadius: 4, fontWeight: 600 }}>{selectedTarget.vertical}</span>
                </div>
                <h2 style={{ fontSize: 22, color: "#FEE123", fontWeight: 800, marginBottom: 2 }}>{selectedTarget.company}</h2>
                <div style={{ fontSize: 13, color: "#888" }}>{selectedTarget.location} · Founded {selectedTarget.founded}</div>
                {selectedTarget.website && selectedTarget.website.startsWith("http") && (
                  <div onClick={() => window.open(selectedTarget.website, "_blank")} style={{ fontSize: 12, color: "#1b8a5a", textDecoration: "underline", display: "inline-block", marginTop: 4, cursor: "pointer" }}>{selectedTarget.website.replace("https://", "").replace("http://", "").replace(/\/$/, "")} ↗</div>
                )}
              </div>
              <button onClick={() => setSelectedTarget(null)} style={{ background: "#111", border: "1px solid #2a2a2a", color: "#777", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'Barlow',sans-serif", height: 32 }}>✕</button>
            </div>

            {selectedTarget.evaluation && (
              <div style={{ background: "rgba(254,225,35,0.04)", border: "1px solid rgba(254,225,35,0.12)", borderRadius: 10, padding: 18, marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.8 }}>{selectedTarget.evaluation}</div>
              </div>
            )}
            <Sec title="Owner / Decision Maker" color="#FEE123">
              {(selectedTarget.owners.includes("Research needed") || selectedTarget.owners.includes("Not publicly")) ? (
                <div style={{ fontSize: 13, color: "#8B2500", padding: "8px 0" }}>Owner research needed — check OR/WA Secretary of State</div>
              ) : (
                <div>
                  {(() => {
                    const raw = selectedTarget.owners;
                    // Extract CCB holder before stripping
                    const ccbMatch = raw.match(/CCB[^:]*:\s*([^.]+)/i);
                    const cleaned = raw
                      .replace(/\s*—\s*(3rd generation|2nd generation|Klink family|Cray family|sisters|family|per customer reviews).*$/i, "")
                      .replace(/\.\s*CCB.*$/, "")
                      .replace(/\.\s*Parent entity.*$/, "")
                      .replace(/\.\s*Legal entity.*$/, "")
                      .replace(/\.\s*PHCC.*$/, "")
                      .replace(/\.\s*Check.*$/, "")
                      .replace(/\.\s*Manager:.*$/, "")
                      .replace(/\.\s*BBB does not.*$/, "")
                      .replace(/\.\s*75\+.*$/, "")
                      .replace(/\s*—\s*but ACQUIRED.*$/, "");
                    const parts = cleaned.split(/,\s*(?=[A-Z])|\s+&\s+(?=[A-Z])/);
                    const rows = parts.map((person, i) => {
                      let trimmed = person.trim();
                      if (!trimmed || trimmed.length < 3) return null;
                      const titleMatch = trimmed.match(/\(([^)]+)\)/);
                      let title = titleMatch ? titleMatch[1].replace(/\s*—\s*per.*$/i, "").replace(/\s*per\s+.*$/i, "").trim() : "";
                      let name = trimmed.replace(/\s*\([^)]*\)/g, "").trim();
                      if (name.startsWith("but ") || name.startsWith("per ") || name.startsWith("Previously") || name.startsWith("Fourth") || name.startsWith("Research") || name.startsWith("The Gladow")) return null;
                      if (!name) return null;
                      return (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
                          <div style={{ fontSize: 15, color: "#FEE123", fontWeight: 600 }}>{name}</div>
                          {title && <div style={{ fontSize: 14, color: "#1b8a5a", fontWeight: 600 }}>{title}</div>}
                        </div>
                      );
                    });
                    // Add CCB holders as separate rows
                    const ccbHolderMatch = raw.match(/CCB license holders?:\s*([^.]+)/i);
                    const ccbOwnerMatch = raw.match(/CCB license owner:\s*([^.]+)/i);
                    const ccbNames = ccbHolderMatch ? ccbHolderMatch[1].split(/,\s*/) : ccbOwnerMatch ? ccbOwnerMatch[1].split(/,\s*/) : [];
                    ccbNames.forEach((name, idx) => {
                      const n = name.trim();
                      if (n) rows.push(
                        <div key={"ccb"+idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
                          <div style={{ fontSize: 15, color: "#FEE123", fontWeight: 600 }}>{n}</div>
                          <div style={{ fontSize: 14, color: "#1b8a5a", fontWeight: 600 }}>CCB License Holder</div>
                        </div>
                      );
                    });
                    // Add CCB license number if in data
                    if (selectedTarget.ccb && selectedTarget.ccb !== "Research needed") {
                      rows.push(
                        <div key="ccbnum" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
                          <div style={{ fontSize: 13, color: "#888" }}>CCB #{selectedTarget.ccb}</div>
                          <div style={{ fontSize: 14, color: "#1b8a5a", fontWeight: 600 }}>OR Contractor License</div>
                        </div>
                      );
                    }
                    return rows;
                  })()}
                </div>
              )}
            </Sec>
            <Sec title="Contact Information" color="#1b8a5a">
              <Row l="Address" v={selectedTarget.address} gold />
              <Row l="Phone" v={selectedTarget.phone} gold />
              <Row l="Email" v={selectedTarget.email} gold />
              <Row l="Website" v={selectedTarget.website} />
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {selectedTarget.website && selectedTarget.website.startsWith("http") && (
                  <div onClick={() => window.open(selectedTarget.website, "_blank")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#111", border: "1px solid #2a2a2a", color: "#ccc", padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>🌐 Open Website →</div>
                )}
                {selectedTarget.linkedIn && (
                  <div onClick={() => window.open(selectedTarget.linkedIn, "_blank")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#154733", border: "1px solid #1b8a5a", color: "#FEE123", padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FEE123"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    Owner LinkedIn →
                  </div>
                )}
              </div>
            </Sec>
            <Sec title="Financial Estimates" color="#1b8a5a">
              <Row l="Est. Revenue" v={selectedTarget.estRevenue} />
              <Row l="Employees" v={selectedTarget.employees} />
              <Row l="Google Rating" v={`⭐ ${selectedTarget.googleRating} (${selectedTarget.reviewCount} reviews)`} />
            </Sec>
            <Sec title="Analog Score" color="#FEE123">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: 3 }}>{Array.from({ length: 10 }).map((_, i) => <div key={i} style={{ width: 24, height: 8, borderRadius: 2, background: i < selectedTarget.analogScore ? "#FEE123" : "#1a1a1a" }} />)}</div>
                <span style={{ fontSize: 20, color: "#FEE123", fontWeight: 800 }}>{selectedTarget.analogScore}/10</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>Higher = more analog ops = greater post-acquisition margin expansion</div>
            </Sec>
            <Sec title="Real Estate Status" color="#1b8a5a">
              <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{selectedTarget.reStatus}</div>
              </div>
            </Sec>
            <Sec title="Data Sources" color="#555">
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{selectedTarget.source}</div>
            </Sec>
            <Sec title="Analyst Notes" color="#154733">
              <div style={{ background: "rgba(21,71,51,0.15)", border: "1px solid rgba(21,71,51,0.3)", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, color: "#8fdfb4", lineHeight: 1.7, fontStyle: "italic" }}>{selectedTarget.notes}</div>
              </div>
            </Sec>
          </div>
        </div>
      )}
    </div>
  </div>;
}

// ==================== TAB 3: COMPETITIVE INTEL ====================
function CompetitiveIntelTab() {
  const [selected, setSelected] = useState(null);
  const peTargets = TARGETS.filter(t => t.notes && (t.notes.includes("PE-ACQUIRED") || t.notes.includes("COMPETITOR") || t.notes.includes("SEER Group")));

  return <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 30, color: "#FEE123", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Competitive Intelligence</div>
      <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>Three PE-backed or self-funded roll-up competitors are actively acquiring home services businesses in the Portland/OR/WA market. Understanding their playbooks is critical to winning deals against them.</div>
    </div>

    <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
      {[
        { label: "Active Competitors", value: "3", color: "#8B2500" },
        { label: "Portland Brands Acquired", value: peTargets.length, color: "#FEE123" },
        { label: "Combined Employee Base", value: "9,000+", color: "#fff" },
        { label: "Combined Capital", value: "$6B+", color: "#1b8a5a" },
      ].map((s, i) => (
        <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 24px", flex: "1 1 140px", textAlign: "center" }}>
          <div style={{ fontSize: 28, color: s.color, fontWeight: 800 }}>{s.value}</div>
          <div style={{ fontSize: 10, color: "#666", fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {COMPETITORS.map(c => (
      <div key={c.id} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, marginBottom: 16, borderLeft: `3px solid ${c.color}`, overflow: "hidden" }}>
        <div onClick={() => setSelected(selected === c.id ? null : c.id)} style={{ padding: 20, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 20, color: "#fff", fontWeight: 700, letterSpacing: 0.5 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{c.hq} · Founded {c.founded} · {c.backer}</div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: c.threat.includes("VERY HIGH") ? "#FEE123" : c.threat.includes("HIGH") ? "#ff6b47" : "#888", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 4 }}>THREAT: {c.threat.split("—")[0].trim()}</span>
            <span style={{ color: "#555", fontSize: 18 }}>{selected === c.id ? "▾" : "▸"}</span>
          </div>
        </div>

        {selected === c.id && (
          <div style={{ padding: "0 20px 20px", borderTop: "1px solid #1a1a1a" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              <div>
                <Sec title="Overview" color={c.color}>
                  <Row l="CEO" v={c.ceo} />
                  <Row l="Funding" v={c.funding} />
                  <Row l="Employees" v={c.employees} />
                  <Row l="Brands" v={c.brands} />
                  <Row l="Website" v={c.website} />
                </Sec>
              </div>
              <div>
                <Sec title="Strategy" color={c.color}>
                  <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7 }}>{c.strategy}</div>
                </Sec>
              </div>
            </div>

            <Sec title="Portland / OR / WA Brands Acquired" color="#FEE123">
              {c.localBrands.map((b, i) => <div key={i} style={{ fontSize: 13, color: "#FEE123", padding: "4px 0", borderBottom: "1px solid #1a1a1a" }}>● {b}</div>)}
            </Sec>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Sec title="Strengths" color="#1b8a5a">
                <div style={{ fontSize: 12, color: "#8fdfb4", lineHeight: 1.7 }}>{c.strengths}</div>
              </Sec>
              <Sec title="Weaknesses" color="#8B2500">
                <div style={{ fontSize: 12, color: "#ff6b47", lineHeight: 1.7 }}>{c.weaknesses}</div>
              </Sec>
            </div>

            <Sec title="Threat Assessment" color="#FEE123">
              <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.7 }}>{c.threat}</div>
            </Sec>
          </div>
        )}
      </div>
    ))}

    <Card accent="#FEE123">
      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 17, color: "#FEE123", fontWeight: 700, letterSpacing: 0.5, marginBottom: 12 }}>WTD Ventures Competitive Advantages</div>
      {[
        { title: "Local Presence", desc: "Based in Portland, OR. A team of Oregon operators, finance professionals, and technologists. We live where we invest. Apex is in Tampa, SEER is in Redmond." },
        { title: "Speed & Flexibility", desc: "No investment committee approvals. No fund timeline pressure. We can move from coffee meeting to LOI in days, not months." },
        { title: "AI-Powered Operations", desc: "No other competitor is deploying AI for call routing, demand forecasting, pricing optimization, or automated marketing. This is our tech edge." },
        { title: "Founder-to-Founder", desc: "We're not sending a VP of Corp Dev. Connor and his partner sit across the table. Owner-to-owner conversations close deals that PE can't." },
        { title: "Not PE", desc: "Every owner has heard horror stories about PE acquisitions — price inflation, culture destruction, employee turnover. We position as the anti-PE alternative with PE-level resources." },
        { title: "Cross-Vertical from Day 1", desc: "We're building HVAC + Electrical + Plumbing from the start. SEER started HVAC-only and is just now adding plumbing. We design the portfolio for cross-sell from acquisition #1." },
      ].map((item, i) => <div key={i} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: "#FEE123", fontWeight: 600 }}>{item.title}</div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{item.desc}</div>
      </div>)}
    </Card>
  </div>;
}

// ==================== MAIN APP ====================
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@400;500;600;700&display=swap";

export default function App() {
  const [tab, setTab] = useState("pipeline");

  const tabs = [
    { id: "plan", label: "BUSINESS PLAN", icon: "◆" },
    { id: "pipeline", label: "TARGET PIPELINE", icon: "◉" },
    { id: "intel", label: "COMPETITIVE INTEL", icon: "⚡" },
  ];

  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <div style={{ fontFamily: "'Barlow',sans-serif", background: "#000", minHeight: "100vh", color: "#e0e0e0" }}>
        {/* HEADER */}
        <div style={{ background: "linear-gradient(180deg, #080808 0%, #000 100%)", borderBottom: "none", padding: "20px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Logo />
              <div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 26, color: "#FEE123", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>WTD Ventures</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#1b8a5a", letterSpacing: 3, textTransform: "uppercase", fontWeight: 600 }}>Next Chapter Partners · Oregon & SW Washington</div>
              </div>
            </div>
          </div>
          {/* TAB BAR — redesigned */}
          <div style={{ display: "flex", gap: 6 }}>
            {tabs.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  background: active ? "linear-gradient(180deg, #154733, #0d2e22)" : "transparent",
                  color: active ? "#FEE123" : "#555",
                  border: active ? "1px solid #1b8a5a" : "1px solid transparent",
                  borderBottom: active ? "1px solid #000" : "1px solid #1a1a1a",
                  borderRadius: "8px 8px 0 0",
                  padding: "12px 24px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "'Rajdhani',sans-serif",
                  cursor: "pointer",
                  letterSpacing: 2,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  position: "relative",
                }}>
                  <span style={{ fontSize: 10, opacity: active ? 1 : 0.4 }}>{t.icon}</span>
                  {t.label}
                  {active && <div style={{ position: "absolute", bottom: -1, left: 12, right: 12, height: 2, background: "#FEE123", borderRadius: 1 }} />}
                </button>
              );
            })}
            <div style={{ flex: 1, borderBottom: "1px solid #1a1a1a" }} />
          </div>
        </div>

        {/* TAB CONTENT */}
        {tab === "plan" && <BusinessPlanTab />}
        {tab === "pipeline" && <PipelineTab />}
        {tab === "intel" && <CompetitiveIntelTab />}
      </div>
    </>
  );
}
