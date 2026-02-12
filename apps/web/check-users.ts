import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    const student = await prisma.user.findFirst({ where: { role: 'STUDENT' } });
    
    console.log('=== ADMIN USER ===');
    console.log('Admin found:', !!admin);
    if (admin) {
      console.log('Email:', admin.email);
      console.log('Name:', admin.name);
      console.log('Role:', admin.role);
      
      // Test password verification
      const isValidPassword = await bcrypt.compare('admin123', admin.password);
      console.log('Password verification (admin123):', isValidPassword);
    }
    
    console.log('\n=== STUDENT USER ===');
    console.log('Student found:', !!student);
    if (student) {
      console.log('Email:', student.email);
      console.log('Name:', student.name);
      console.log('Role:', student.role);
      
      // Test password verification
      const isValidPassword = await bcrypt.compare('student123', student.password);
      console.log('Password verification (student123):', isValidPassword);
    }
    
    // Check for the specific demo users
    const adminDemo = await prisma.user.findUnique({ where: { email: 'admin@ivf.edu' } });
    const studentDemo = await prisma.user.findUnique({ where: { email: 'student@ivf.edu' } });
    
    console.log('\n=== DEMO USERS ===');
    console.log('Admin demo user exists:', !!adminDemo);
    console.log('Student demo user exists:', !!studentDemo);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
