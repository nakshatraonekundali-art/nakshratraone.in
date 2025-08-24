

const api = 'general_house_report/mars';
const userId = '643886';
const apiKey = '8cfa24ac82f34fa17f090ed5a6a2122b9f3e10bf';
const language = 'eng';

const data = {
  name:"Shubham",
  day: 4,
  month: 8,
  year: 2010,
  hour: 7,
  min: 45,
  lat: 19.132,
  lon: 72.342,
  tzone: 5.5,
};

const auth = "Basic " + Buffer.from(userId + ":" + apiKey).toString("base64");

(async () => {
  try {
    const response = await fetch(`https://json.astrologyapi.com/v1/${api}`, {
      method: "POST",
      headers: {
        "Authorization": auth,
        "Content-Type": "application/json",
        "Accept-Language": language
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const result = await response.json();
    console.log(result);

  } catch (err) {
    console.error("Request failed:", err);
  }
})();
