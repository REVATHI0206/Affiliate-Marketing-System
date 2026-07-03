import { Card, CardContent } from "@/components/ui/card";

export default function DashboardCards() {
  const cards = [
    {
      title: "Total Earnings",
      value: "₹25,000",
    },
    {
      title: "Referrals",
      value: "145",
    },
    {
      title: "Coupons Used",
      value: "67",
    },
    {
      title: "Conversion Rate",
      value: "18%",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="rounded-2xl shadow-sm"
        >
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}