# KEITTOKIRJA

## IDEA

Keittokirja-sovellus, jonka avulla voidaan selata käyttäjien lisäämiä reseptejä.

Keskeiset toiminnallisuudet:

- Käyttäjät voivat luoda tilin ja kirjautua sisään.
- Profiilisivulla näkyy käyttäjän tiedot
- Käyttäjä näkee omat reseptit "Omat reseptit" sivulla
- Käyttäjät voivat lisätä uuden reseptin syöttämällä otsikon, kuvauksen, raaka-aineet, valmistusohjeet sekä kuvan ruuasta.
- Resepteissä näkyy niihin lisätyt tagit (Tagin lisääminen reseptin lisäämisen yhteydessä jäi tekemättä)
- Käyttäjät voivat kommentoida reseptejä ja tykätä niistä.
- Reseptien arviointi tähtiluokituksella (1–5 tähteä). (Jäi tekemättä)

##### Yleinen näkymä
![Näyttökuva 2025-03-13 kello 10 30 46](https://github.com/user-attachments/assets/41053814-db75-47dc-8047-38c72675a0a3)


##### Kirjautuneen näkymä
![Näyttökuva 2025-03-13 kello 10 31 56](https://github.com/user-attachments/assets/d5cab47f-bda7-4e2e-ae28-e9c554ffae6a)


##### Kirjautuminen
![Näyttökuva 2025-03-13 kello 10 34 07](https://github.com/user-attachments/assets/90df0d03-3edd-4f1d-b527-764908139237)


##### Rekisteröityminen
![Näyttökuva 2025-03-13 kello 10 34 16](https://github.com/user-attachments/assets/d1f5e361-6d42-41be-8897-b8962764a599)


##### Reseptin lisääminen
![Näyttökuva 2025-03-13 kello 10 35 53](https://github.com/user-attachments/assets/e2701137-fb8c-4b98-b305-a92ebf9721d8)

##### Profiili
![Näyttökuva 2025-03-13 kello 10 43 10](https://github.com/user-attachments/assets/839d2b04-a5e0-43e9-800a-6e46ca8f0448)

##### Omat reseptit
![Näyttökuva 2025-03-13 kello 10 43 39](https://github.com/user-attachments/assets/c6a50dcc-0a1d-4c06-9563-7bfc0c5859d9)

##### Resepti
![Näyttökuva 2025-03-13 kello 11 00 39](https://github.com/user-attachments/assets/51d5c6ed-06bf-44ce-b9b1-6620d4cebc05)

##### Reseptin kommentointi
![Näyttökuva 2025-03-13 kello 11 02 52](https://github.com/user-attachments/assets/2751a2cf-d977-4472-a163-a792a7b01d32)





## Relaatiotietokanta
- UserLevels: Käyttäjätasot, kuten "Admin", "User" ja "Guest".
- Users: Käyttäjätunnukset, salasanat, sähköpostiosoitteet ja käyttäjätaso.
- MediaItems: Käyttäjien lisäämät mediatiedostot eli "reseptit". Sisältää mm. mediatietoston, otsikon, kuvauksen, ainesosat, resepti
- Comments: Käyttäjien jättämät kommentit mediakohteisiin.
- Likes: Käyttäjien tykkäykset mediakohteista.
- Ratings: Käyttäjien antamat arviot (1–5 tähteä) mediakohteille.
- Tags: Mediakohteisiin liitettävät tagit (esim. "Vege", "Video").
- MediaItemTags: MediaItems ja Tagien liitäntätaulu.


### Testitunnukset
- käyttäjä: testaaja
- ss: testaaja

### BUGIT
- Videoiden thumbnail ei näy etusivuilla, eikä reseptin lisäämisessä

### Jatkosovellusmahdollisuuksia
- Reseptin etsintä
- Reseptien filtteröinti tagien avulla
- Kirjautuneella käyttäjällä näkymä, jossa näkyy reseptit, joista tykätty
- Omat reseptit profiilin alle

### FRONT
https://users.metropolia.fi/~henriele/react-projekti/

Iconit FontAwesomesta
