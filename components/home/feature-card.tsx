const FeatureCard = ({ Icon, title, description }) => (
  <div className="bg-background rounded-lg p-4 shadow-sm">
    <Icon className="h-8 w-8 text-primary" />
    <h3 className="text-xl font-semibold mt-2">{title}</h3>
    <p className="text-muted-foreground mt-1">{description}</p>
  </div>
);

export default FeatureCard;
