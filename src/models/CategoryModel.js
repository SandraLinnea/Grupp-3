import mongoose from 'mongoose'; // Importera mongoose för att interagera med MongoDB

// Definiera schema för Category
const categorySchema = new mongoose.Schema({
  "category-name": { // Fält för att lagra kategorinamn (t.ex. "Skafferi", "Drycker")
    type: String, // Typen är String eftersom vi förväntar oss ett textvärde
    required: true, // Kategorin måste ha ett namn
    unique: true, // Namnet på kategorin ska vara unikt
    trim: true, // Ta bort eventuella mellanslag före och efter namnet
  },
  "category-description": { // Fält för en beskrivning av kategorin
    type: String, // Fältet är av typen String
    default: '', // Om ingen beskrivning anges, sätt standardvärdet till en tom sträng
  },
  // Detta är för att hålla en lista av produkter som tillhör denna kategori. 
  // Vi lagrar endast produktens ObjectId här (referens till Product-modellen)
  products: [{ 
    type: mongoose.Schema.Types.ObjectId, // Referens till Product-modellen
    ref: 'Product', // Definierar att detta fält refererar till modellen "Product"
  }],
}, { 
  timestamps: true, // Skapar automatiskt fälten createdAt och updatedAt
});

// Skapa Category-modellen baserat på schema
export default mongoose.model('CategoryModel', categorySchema);
// Exportera Category-modellen för att kunna använda den i andra filer