import type { IArticleDetail } from "./ArticleDetail";
import { Link } from "react-router";
import { StrapiImage } from "./StrapiImage";

export interface IArticleCard extends IArticleDetail {
  // Additional props for card display
}

const styles = {
  card: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
  image: "w-full h-48 object-cover",
  content: "p-6",
  title: "text-xl font-semibold mb-3 text-gray-900 hover:text-blue-600",
  description: "text-gray-600 mb-4 line-clamp-3",
  meta: "flex items-center justify-between text-sm text-gray-500",
  author: "font-medium",
  date: "text-gray-400",
  link: "block",
};

export function ArticleCard(props: IArticleCard) {
  const { title, description, featuredImage, author, publishedAt, slug } = props;

  return (
    <Link to={`/articles/${slug}`} className={styles.link}>
      <div className={styles.card}>
        {featuredImage?.url && (
          <StrapiImage
            src={featuredImage.url}
            alt={featuredImage.alternativeText || title || "Article image"}
            aspectRatio="16:9"
            className={styles.image}
          />
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.meta}>
            {author?.fullName && (
              <span className={styles.author}>By {author.fullName}</span>
            )}
            {publishedAt && (
              <span className={styles.date}>
                {new Date(publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}



