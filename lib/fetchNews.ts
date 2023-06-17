import { gql } from 'graphql-request';
import sortNewsByImage from './sortNewsByImage';

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
 // graphQL query
 const query = gql`
 query MyQuery(
     $access_key: String!
     $categories: String!
     $keywords: String
 ) {
     myQuery(
         access_key: $access_key
         categories: $categories
         countries: "us,gb"
         sort: "published_desc"
         keywords: $keywords
     ) {
         pagination {
             count
             limit
             offset
             total
         }
         data {
             author
             category
             country
             description
             image
             language
             published_at
             source
             title
             url
         }
     }
 }
`;
// Fetch function w/ next 13
const res = await fetch(
    'https://ruiselede.stepzen.net/api/hissing-quokka/__graphql',
    {
        method: 'POST',
        cache: isDynamic ? 'no-cache' : 'default',
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords,
            },
        }),
    }
);
        console.log('LOADING NEW DATA FROM API FOR CATEGORY -> ', category, keywords);
        const newsResponse = await res.json();
	    // sort function
	    const news = sortNewsByImage(newsResponse.data.myQuery);

	    return news;
	    // return results
}

export default fetchNews;

// http://api.mediastack.com/v1/news?access_key=3d3e1c915876d3ed5dbcbfb18f744c25&sources=business,sports