import { useIndexedDb } from "./indexedDb";
import { Transaction } from "../routes/api.js";

function OLTransaction() {
  useIndexedDb("articles", "ArticleStore", "get").then(results => {
    const favorites = results;
    Transaction().then(data => {
      const mappedData = data.map(article => {
        article.favorite = false;
        favorites.forEach(fav => {
          if (article._id === fav._id) {
            article.favorite = true;
          }
        });
        return article;
      });
      Transaction(mappedData, OLTransaction);
    });
  });
}

OLTransaction();
