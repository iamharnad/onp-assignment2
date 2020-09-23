
const getRandomArticleFromCategory = articles => {
  const randomNum = Math.floor(Math.random() * articles.length)
  return articles[randomNum]
}


export const getArticleFromEachCategory = news => {
  const articles = []
  for (let category in news) {
    articles.push({ category, ...getRandomArticleFromCategory(news[category]) })
  }

  return articles
}


export const toProperCase = str => str[0].toUpperCase() + str.slice(1).toLowerCase()


export const getRandomArticle = news => {
  const categories = Object.keys(news)
  const randomCategoryIndex = Math.floor(Math.random() * categories.length)
  const randomCategory = categories[randomCategoryIndex]

  return randomCategory ? { category: randomCategory, ...getRandomArticleFromCategory(news[randomCategory]) } : {}
}
