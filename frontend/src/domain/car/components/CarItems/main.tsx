import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/tabs';
import type { CarItemsProps } from './types';

function CarItems({ car }: CarItemsProps) {
  // Group items by category
  const groupByCategory = (items: Array<{ name: string; category: string }>) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item.name);
      return acc;
    }, {} as Record<string, string[]>);
  };

  const standardGrouped = groupByCategory(car.standardItems || []);
  const optionalGrouped = groupByCategory(car.optionalItems || []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens e Opcionais</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard">
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Itens de Série</TabsTrigger>
            <TabsTrigger value="optional">Opcionais</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-6">
            {Object.entries(standardGrouped).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-muted-foreground mb-2 text-sm font-semibold">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, idx) => (
                    <Badge key={idx} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(standardGrouped).length === 0 && (
              <p className="text-muted-foreground">Nenhum item de série listado.</p>
            )}
          </TabsContent>

          <TabsContent value="optional" className="space-y-6">
            {Object.entries(optionalGrouped).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-muted-foreground mb-2 text-sm font-semibold">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, idx) => (
                    <Badge key={idx} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(optionalGrouped).length === 0 && (
              <p className="text-muted-foreground">Nenhum opcional listado.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export { CarItems };
