export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  STAFF = "STAFF",
}

export enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Category {
  PLUMBING = "PLUMBING",
  ELECTRICAL = "ELECTRICAL",
  CARPENTRY = "CARPENTRY",
  PERSONNEL = "PERSONNEL",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum NotificationType {
  REQUEST_CREATED = "REQUEST_CREATED",
  REQUEST_UPDATED = "REQUEST_UPDATED",
  REQUEST_ASSIGNED = "REQUEST_ASSIGNED",
  REQUEST_COMPLETED = "REQUEST_COMPLETED",
  COMMENT_ADDED = "COMMENT_ADDED",
  SYSTEM_ANNOUNCEMENT = "SYSTEM_ANNOUNCEMENT",
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  priority: Priority;
  location?: string;
  images: string[];
  documents: string[];
  requestedBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  user?: User;
  comments?: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  requestId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  userId: string;
  requestId?: string;
  read: boolean;
  createdAt: Date;
}
