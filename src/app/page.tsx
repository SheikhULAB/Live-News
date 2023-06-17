import { categoiries } from "../../constants"
import fetchNews from "../../lib/fetchNews"
import NewsList from "./NewsList"

export default async function Home() {
  const news: NewsResponse = await fetchNews(categoiries.join(','))

  return (
    <main className="">
       <NewsList news={news} />
    </main>
  )
}
