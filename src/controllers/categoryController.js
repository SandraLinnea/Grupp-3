// controllers/categoryController.js
import Category from '../models/CategoryModel.js';
import mockCategories from '../mocks/categoryMocks.js';

// Hämta alla kategorier
export const getCategories = async (req, res) => {
  try {
    // Om du vill hämta från databasen, använd:
    // const categories = await Category.find();
    
    // För att använda mockad data under utveckling:
    const categories = mockCategories;
    
    res.json(categories); // Skickar tillbaka kategorierna till klienten
  } catch (error) {
    console.error(error);
    res.status(500).send('Något gick fel vid hämtning av kategorier');
  }
};
// export default router;
// // routes/categoryRoutes.js