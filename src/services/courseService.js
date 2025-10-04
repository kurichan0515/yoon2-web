import { 
  createCourseData, 
  validateCourseForm, 
  COURSE_CATEGORIES 
} from '../types/courseTypes';

// Mock course service for development
class CourseService {
  constructor() {
    this.courses = this.initializeMockCourses();
  }

  initializeMockCourses() {
    return [
      createCourseData({
        id: '1',
        name: 'yoon²極メニュー',
        description: 'イヤーエステと耳つぼの組み合わせで、最高のリラクゼーションを提供します。',
        price: 8000,
        duration: '90分',
        image: '/images/menus/recommend-menu.jpg',
        category: COURSE_CATEGORIES.RECOMMEND
      }),
      createCourseData({
        id: '2',
        name: '最上級メニュー',
        description: 'ドライヘッドスパとイヤーエステの組み合わせで、頭部全体の疲れを解消します。',
        price: 10000,
        duration: '120分',
        image: '/images/menus/recommend-menu.jpg',
        category: COURSE_CATEGORIES.RECOMMEND
      }),
      createCourseData({
        id: '3',
        name: '耳つぼ（付け放題）',
        description: '耳つぼの基本施術で、体のバランスを整えます。',
        price: 3000,
        duration: '60分',
        image: '/images/menus/mimitubo-menu.jpg',
        category: COURSE_CATEGORIES.MIMITUBO
      }),
      createCourseData({
        id: '4',
        name: 'イヤーエステ',
        description: '耳の専門的なケアで、深いリラクゼーションを提供します。',
        price: 5000,
        duration: '60分',
        image: '/images/menus/ear-este-menu.jpg',
        category: COURSE_CATEGORIES.EAR_ESTE
      }),
      createCourseData({
        id: '5',
        name: 'ドライヘッドスパ',
        description: '頭部のマッサージで、頭の疲れを解消します。',
        price: 4000,
        duration: '45分',
        image: '/images/menus/ear-este-menu.jpg',
        category: COURSE_CATEGORIES.DRY_HEAD
      })
    ];
  }

  // Create a new course
  async createCourse(courseData) {
    try {
      const validation = validateCourseForm(courseData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
      }

      const newCourse = createCourseData({
        ...courseData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      this.courses.push(newCourse);
      return { success: true, data: newCourse };
    } catch (error) {
      console.error('Error creating course:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all courses
  async getAllCourses() {
    try {
      return { success: true, data: [...this.courses] };
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { success: false, error: error.message };
    }
  }

  // Get course by ID
  async getCourseById(id) {
    try {
      const course = this.courses.find(c => c.id === id);
      if (!course) {
        throw new Error(`Course with id ${id} not found`);
      }
      return { success: true, data: course };
    } catch (error) {
      console.error('Error fetching course:', error);
      return { success: false, error: error.message };
    }
  }

  // Get courses by category
  async getCoursesByCategory(category) {
    try {
      const filteredCourses = this.courses.filter(c => c.category === category);
      return { success: true, data: filteredCourses };
    } catch (error) {
      console.error('Error fetching courses by category:', error);
      return { success: false, error: error.message };
    }
  }

  // Update course
  async updateCourse(id, updateData) {
    try {
      const validation = validateCourseForm(updateData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
      }

      const courseIndex = this.courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        throw new Error(`Course with id ${id} not found`);
      }

      const updatedCourse = {
        ...this.courses[courseIndex],
        ...updateData,
        id,
        updatedAt: new Date().toISOString()
      };

      this.courses[courseIndex] = updatedCourse;
      return { success: true, data: updatedCourse };
    } catch (error) {
      console.error('Error updating course:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete course
  async deleteCourse(id) {
    try {
      const courseIndex = this.courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        throw new Error(`Course with id ${id} not found`);
      }

      const deletedCourse = this.courses.splice(courseIndex, 1)[0];
      return { success: true, data: deletedCourse };
    } catch (error) {
      console.error('Error deleting course:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const courseService = new CourseService();

export default courseService;

