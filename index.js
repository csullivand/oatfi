const axios = require('axios');

const eliteClubs = async (nation, minValuation, minTitle)=> {

    const url = `https://jsonmock.hackerrank.com/api/football_teams?nation=${nation}`;

    let page = 1;
    let numPages = 1;
    let clubs = [];

    while (page <= numPages) {

        const responseData = await axios.get(`${url}&page=${page}`);
        const data = responseData.data;

        numPages = data.total_pages;
      
        let clubsFilter = data.data.filter(
            (club) =>
                club.nation === nation &&
                club.estimated_value_numeric >= minValuation &&
                club.number_of_league_titles_won >= minTitle
        );

        let mapClubs = clubsFilter.map((club)=>({
            name:club.name,
            valuation:club.estimated_value_numeric
        }))

        clubs.push(...mapClubs);
        page++;

    }

    //dont remember if it was descending or ascending or if there was another validation 
    clubs.sort((a, b) => b.name.localeCompare(a.name));

    // return clubs;
    console.log(clubs)

};

eliteClubs('England',2000000000,1 );
