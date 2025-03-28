import mongoose from 'mongoose'; // Importera mongoose för att interagera med MongoDB

// Definiera schema för Category
const categorySchema = new mongoose.Schema({
  name: { // Fält för att lagra kategorinamn (t.ex. "Skafferi", "Drycker")
    type: String, // Typen är String eftersom vi förväntar oss ett textvärde
    required: true, // Kategorin måste ha ett namn
    trim: true, // Ta bort eventuella mellanslag före och efter namnet
  },
  description: { // Fält för en beskrivning av kategorin
    type: String, // Fältet är av typen String
    default: '', // Om ingen beskrivning anges, sätt standardvärdet till en tom sträng
  },
}, { 
  timestamps: true, // Skapar automatiskt fälten createdAt och updatedAt
});

// Skapa Category-modellen baserat på schema
export default mongoose.model('CategoryModel', categorySchema);
// Exportera Category-modellen för att kunna använda den i andra filer