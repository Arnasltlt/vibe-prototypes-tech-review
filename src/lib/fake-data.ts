// Fake data generators for wireframing
export const FakeData = {
  // Text generators
  text: {
    word: () => {
      const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
      return words[Math.floor(Math.random() * words.length)];
    },
    
    sentence: (wordCount = 8) => {
      return Array.from({ length: wordCount }, () => FakeData.text.word())
        .join(' ')
        .charAt(0).toUpperCase() + Array.from({ length: wordCount }, () => FakeData.text.word()).join(' ').slice(1) + '.';
    },
    
    paragraph: (sentenceCount = 3) => {
      return Array.from({ length: sentenceCount }, () => FakeData.text.sentence()).join(' ');
    },
    
    title: () => {
      const titles = [
        'Product Dashboard Overview',
        'Analytics & Insights',
        'User Management System',
        'Order Processing Center',
        'Inventory Management',
        'Customer Relations Portal',
        'Financial Reports Hub',
        'Project Timeline View'
      ];
      return titles[Math.floor(Math.random() * titles.length)];
    },
    
    heading: () => {
      const headings = [
        'Quick Actions',
        'Recent Activity',
        'Key Metrics',
        'Important Updates',
        'Team Performance',
        'Monthly Overview',
        'Featured Items',
        'System Status'
      ];
      return headings[Math.floor(Math.random() * headings.length)];
    },
    
    label: () => {
      const labels = ['Name', 'Email', 'Phone', 'Address', 'Status', 'Date', 'Amount', 'Category', 'Type', 'Priority'];
      return labels[Math.floor(Math.random() * labels.length)];
    }
  },
  
  // User data
  user: {
    name: () => {
      const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    },
    
    email: () => {
      const name = FakeData.user.name().toLowerCase().replace(' ', '.');
      const domains = ['example.com', 'test.com', 'demo.com', 'sample.org'];
      return `${name}@${domains[Math.floor(Math.random() * domains.length)]}`;
    },
    
    avatar: (seed?: string) => {
      const s = seed || Math.random().toString();
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`;
    },
    
    role: () => {
      const roles = ['Admin', 'Manager', 'User', 'Editor', 'Viewer', 'Developer', 'Designer', 'Analyst'];
      return roles[Math.floor(Math.random() * roles.length)];
    }
  },
  
  // Numbers and metrics
  number: {
    integer: (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    decimal: (min = 0, max = 100, decimals = 2) => {
      const num = Math.random() * (max - min) + min;
      return parseFloat(num.toFixed(decimals));
    },
    
    currency: (min = 10, max = 1000) => {
      return `$${FakeData.number.decimal(min, max, 2).toLocaleString()}`;
    },
    
    percentage: () => `${FakeData.number.integer(0, 100)}%`,
    
    phone: () => {
      const areaCode = FakeData.number.integer(200, 999);
      const prefix = FakeData.number.integer(200, 999);
      const lineNumber = FakeData.number.integer(1000, 9999);
      return `(${areaCode}) ${prefix}-${lineNumber}`;
    }
  },
  
  // Dates
  date: {
    recent: (daysAgo = 30) => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
      return date;
    },
    
    future: (daysAhead = 30) => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead));
      return date;
    },
    
    formatted: (date?: Date) => {
      const d = date || FakeData.date.recent();
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },
    
    time: () => {
      const hours = FakeData.number.integer(1, 12);
      const minutes = FakeData.number.integer(0, 59).toString().padStart(2, '0');
      const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
      return `${hours}:${minutes} ${ampm}`;
    }
  },
  
  // Status and states
  status: {
    order: () => {
      const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    },
    
    generic: () => {
      const statuses = ['Active', 'Inactive', 'Pending', 'Completed', 'Failed', 'In Progress'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    },
    
    priority: () => {
      const priorities = ['Low', 'Medium', 'High', 'Critical', 'Urgent'];
      return priorities[Math.floor(Math.random() * priorities.length)];
    },
    
    tag: () => {
      const tags = ['New', 'Featured', 'Popular', 'Trending', 'Sale', 'Limited', 'Exclusive', 'Beta'];
      return tags[Math.floor(Math.random() * tags.length)];
    }
  },
  
  // Lists and collections
  list: {
    generate: <T>(generator: () => T, count: number): T[] => {
      return Array.from({ length: count }, generator);
    },
    
    items: (count = 5) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: FakeData.text.sentence(3),
        description: FakeData.text.sentence(8),
        status: FakeData.status.generic(),
        date: FakeData.date.formatted(),
        value: FakeData.number.currency()
      }));
    },
    
    navigation: () => [
      { label: 'Dashboard', href: '/dashboard', icon: 'home' },
      { label: 'Products', href: '/products', icon: 'box' },
      { label: 'Orders', href: '/orders', icon: 'shopping-cart' },
      { label: 'Customers', href: '/customers', icon: 'users' },
      { label: 'Analytics', href: '/analytics', icon: 'chart' },
      { label: 'Settings', href: '/settings', icon: 'settings' }
    ]
  },
  
  // Media placeholders
  media: {
    image: (width = 400, height = 300, category = 'abstract') => {
      return `https://picsum.photos/${width}/${height}?random=${Math.random()}`;
    },
    
    icon: () => {
      const icons = ['📊', '📈', '📉', '📋', '📌', '🎯', '💡', '🔔', '⚡', '🌟'];
      return icons[Math.floor(Math.random() * icons.length)];
    },
    
    color: () => {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#6C5CE7'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  },
  
  // Chart data
  chart: {
    timeSeries: (points = 7) => {
      const data = [];
      const date = new Date();
      date.setDate(date.getDate() - points);
      
      for (let i = 0; i < points; i++) {
        date.setDate(date.getDate() + 1);
        data.push({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: FakeData.number.integer(100, 1000)
        });
      }
      return data;
    },
    
    categories: (count = 5) => {
      const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
      return categories.slice(0, count).map(name => ({
        name,
        value: FakeData.number.integer(100, 1000)
      }));
    },
    
    pie: () => {
      const total = 100;
      const slices = FakeData.number.integer(3, 6);
      const values = [];
      let remaining = total;
      
      for (let i = 0; i < slices - 1; i++) {
        const value = FakeData.number.integer(10, remaining / 2);
        values.push(value);
        remaining -= value;
      }
      values.push(remaining);
      
      return values.map((value, index) => ({
        label: `Segment ${index + 1}`,
        value,
        percentage: value
      }));
    }
  }
};

// Export specific generators for convenience
export const {
  text: fakeText,
  user: fakeUser,
  number: fakeNumber,
  date: fakeDate,
  status: fakeStatus,
  list: fakeList,
  media: fakeMedia,
  chart: fakeChart
} = FakeData;