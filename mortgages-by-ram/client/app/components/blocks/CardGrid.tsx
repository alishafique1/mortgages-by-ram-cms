import type { TCard } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface ICardGrid {
  __component: "blocks.card-grid";
  id: number;
  cards: TCard[];
}

const styles = {
  section: "py-20 bg-gradient-to-b from-background via-muted/30 to-background",
  container: "container mx-auto px-4",
  cardGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  cardContainer: 
    "group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 " +
    "transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card/80 backdrop-blur-sm",
  cardHeader: "space-y-4 pb-4",
  iconContainer: 
    "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center " +
    "group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110",
  icon: "text-primary text-2xl font-bold",
  cardTitle: "text-xl font-semibold text-foreground group-hover:text-primary transition-colors",
  cardText: "text-muted-foreground leading-relaxed",
  decorativeElement: 
    "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl " +
    "group-hover:bg-primary/10 transition-all duration-500 -z-0",
};

// Icon mapping for different service types
const getServiceIcon = (index: number): string => {
  const icons = ["🏠", "💰", "🏦", "📊", "🔑", "💼", "📈", "✨"];
  return icons[index % icons.length];
};

export function CardGrid(props: ICardGrid) {
  const { cards } = props;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cardGrid}>
          {cards.map((card, index) => (
            <Card key={card.id} className={styles.cardContainer}>
              <div className={styles.decorativeElement} />
              <CardHeader className="relative z-10">
                <div className={styles.cardHeader}>
                  <div className={styles.iconContainer}>
                    <span className={styles.icon}>
                      {getServiceIcon(index)}
                    </span>
                  </div>
                  <CardTitle className={styles.cardTitle}>
                    {card.heading}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className={styles.cardText}>{card.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
