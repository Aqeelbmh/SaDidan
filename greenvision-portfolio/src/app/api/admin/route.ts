import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Data file paths
const DATA_DIR = path.join(process.cwd(), 'data');
const SECTIONS = {
  timeline: 'timeline.json',
  publications: 'publications.json',
  gallery: 'gallery.json',
  awards: 'awards.json',
  projects: 'projects.json',
  language: 'language.json',
  certificates: 'certificates.json'
};

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize data files if they don't exist
  Object.entries(SECTIONS).forEach(([section, filename]) => {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      const initialData = getInitialData(section);
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }
  });
} catch (error) {
  console.error('Error initializing data directory:', error);
}

function getInitialData(section: string) {
  switch (section) {
    case 'timeline':
      return [
        {
          id: '1',
          year: '2023',
          title: 'Software Engineer',
          company: 'Tech Company',
          description: 'Developed web applications using modern technologies.',
          icon: '💼'
        }
      ];
    case 'publications':
      return [
        {
          id: '1',
          title: 'Research Paper Title',
          authors: 'Your Name, Co-author',
          journal: 'Journal Name',
          year: '2023',
          doi: '10.1000/example',
          link: 'https://example.com'
        }
      ];
    case 'gallery':
      return [
        {
          id: '1',
          title: 'Project Image',
          description: 'Description of the image',
          imageUrl: '/gallery/image1.jpg',
          category: 'projects'
        }
      ];
    case 'awards':
      return [
        {
          id: '1',
          title: 'Best Developer Award',
          organization: 'Tech Conference',
          year: '2023',
          description: 'Recognized for outstanding contributions to software development.'
        }
      ];
    case 'projects':
      return [
        {
          id: '1',
          title: 'Portfolio Website',
          description: 'A modern portfolio website built with Next.js and Tailwind CSS.',
          technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
          githubUrl: 'https://github.com/username/portfolio',
          liveUrl: 'https://portfolio.com',
          imageUrl: '/projects/portfolio.jpg'
        }
      ];
    case 'language':
      return [
        {
          id: '1',
          name: 'JavaScript',
          proficiency: 90,
          category: 'Programming'
        }
      ];
    case 'certificates':
      return [
        {
          id: '1',
          title: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2023-12-01',
          credentialId: 'AWS-123456',
          imageUrl: '/certificates/aws.png',
          link: 'https://aws.amazon.com/certification/'
        }
      ];
    default:
      return [];
  }
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(JSON.stringify({ error: 'API not available in production/static export. Use the admin dashboard UI.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  
  if (!section || !SECTIONS[section as keyof typeof SECTIONS]) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }

  try {
    const filePath = path.join(DATA_DIR, SECTIONS[section as keyof typeof SECTIONS]);
    
    // Check if file exists, if not return initial data
    if (!fs.existsSync(filePath)) {
      const initialData = getInitialData(section);
      return NextResponse.json(initialData);
    }
    
    const data = fs.readFileSync(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading data:', error);
    // Return initial data as fallback
    const initialData = getInitialData(section);
    return NextResponse.json(initialData);
  }
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(JSON.stringify({ error: 'API not available in production/static export. Use the admin dashboard UI.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  
  if (!section || !SECTIONS[section as keyof typeof SECTIONS]) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const filePath = path.join(DATA_DIR, SECTIONS[section as keyof typeof SECTIONS]);
    
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Read existing data
    const existingData = fs.existsSync(filePath) 
      ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      : [];
    
    // Add new item with ID
    const newItem = {
      ...body,
      id: Date.now().toString()
    };
    
    const updatedData = [...existingData, newItem];
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(JSON.stringify({ error: 'API not available in production/static export. Use the admin dashboard UI.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const id = searchParams.get('id');
  
  if (!section || !SECTIONS[section as keyof typeof SECTIONS] || !id) {
    return NextResponse.json({ error: 'Invalid section or ID' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const filePath = path.join(DATA_DIR, SECTIONS[section as keyof typeof SECTIONS]);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Section data not found' }, { status: 404 });
    }
    
    // Read existing data
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Update item
    const updatedData = existingData.map((item: Record<string, unknown>) => 
      item.id === id ? { ...item, ...body } : item
    );
    
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(JSON.stringify({ error: 'API not available in production/static export. Use the admin dashboard UI.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const id = searchParams.get('id');
  
  if (!section || !SECTIONS[section as keyof typeof SECTIONS] || !id) {
    return NextResponse.json({ error: 'Invalid section or ID' }, { status: 400 });
  }

  try {
    const filePath = path.join(DATA_DIR, SECTIONS[section as keyof typeof SECTIONS]);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Section data not found' }, { status: 404 });
    }
    
    // Read existing data
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Remove item
    const updatedData = existingData.filter((item: Record<string, unknown>) => item.id !== id);
    
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
} 