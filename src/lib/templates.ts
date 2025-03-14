
export interface DiagramTemplate {
  id: string;
  name: string;
  description: string;
  category: 'flowchart' | 'sequence' | 'state' | 'class' | 'er' | 'other';
  code: string;
}

const templates: DiagramTemplate[] = [
  {
    id: 'simple-flowchart',
    name: 'Simple Flowchart',
    description: 'Basic flowchart with decision point',
    category: 'flowchart',
    code: `graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B`
  },
  {
    id: 'process-flow',
    name: 'Process Flow',
    description: 'Linear process with multiple steps',
    category: 'flowchart',
    code: `graph LR
    A[Start] --> B[Process 1]
    B --> C[Process 2]
    C --> D[Process 3]
    D --> E[End]`
  },
  {
    id: 'sequence-basic',
    name: 'Basic Sequence',
    description: 'Simple sequence between two actors',
    category: 'sequence',
    code: `sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!`
  },
  {
    id: 'state-machine',
    name: 'State Machine',
    description: 'Basic state transition diagram',
    category: 'state',
    code: `stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]`
  },
  {
    id: 'class-diagram',
    name: 'Class Diagram',
    description: 'Simple class relationship diagram',
    category: 'class',
    code: `classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }`
  },
  {
    id: 'er-diagram',
    name: 'Entity Relationship',
    description: 'Database entity relationship diagram',
    category: 'er',
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`
  },
  {
    id: 'gantt-chart',
    name: 'Gantt Chart',
    description: 'Project timeline visualization',
    category: 'other',
    code: `gantt
    title Project Schedule
    dateFormat  YYYY-MM-DD
    section Planning
    Research           :a1, 2023-01-01, 7d
    Documentation      :a2, after a1, 5d
    section Development
    Implementation     :a3, after a2, 10d
    Testing            :a4, after a3, 5d`
  }
];

export const getTemplatesByCategory = (category?: string) => {
  if (!category) return templates;
  return templates.filter(t => t.category === category);
};

export const getTemplateById = (id: string) => {
  return templates.find(t => t.id === id);
};

export const getAllCategories = () => {
  return Array.from(new Set(templates.map(t => t.category)));
};

export default templates;
