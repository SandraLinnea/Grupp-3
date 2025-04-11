# Hakim Livs API Documentation
Base URL: `/api`
Version: 1.0.0

## Authentication
Bearer token required for protected endpoints (All protected endpoints require a JWT token sent in the Authorization header):
```bash
Authorization: Bearer <your_access_token>
```

## Endpoints

### Authentication Endpoints

#### 1. Register New User
```http
POST /auth/register
```
**Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "firstName": "string (required)",
  "lastName": "string (required)"
}
```
**Responses:**
- `201`: User created successfully
  ```json
  {
    "message": "Användare registrerad korrekt"
  }
  ```
- `500`: Registration error
  ```json
  {
    "error": "Serverfel vid registrering"
  }
  ```

#### 2. Login
```http
POST /auth/login
```
**Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```
**Responses:**
- `200`: Login successful
  ```json
  {
    "message": "Inloggningen lyckades",
    "accessToken": "string",
    "user": {
      "firstName": "string",
      "email": "string",
      "role": "user|admin"
    }
  }
  ```
- `400`: Login failed
  ```json
  {
    "error": "Kunde inte logga in"
  }
  ```

#### 3. Get Current User
```http
GET /auth/me
```
**Auth:** Required

**Responses:**
- `200`: User data
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "isAdmin": "boolean"
  }
  ```
- `401`: Authentication error
  ```json
  {
    "message": "Du behöver logga in igen"
  }
  ```

#### 4. Get All Users (Admin)
```http
GET /auth/admin/users
```
**Auth:** Admin only

**Responses:**
- `200`: List of users
- `401`: Unauthorized
  ```json
  {
    "message": "Kunde inte hämta användare"
  }
  ```

### Product Endpoints

#### 1. Get All Products
```http
GET /products
```
**Responses:**
- `200`: Array of products
- `500`: Server error
  ```json
  {
    "error": "Fel vid hämtning av produkter"
  }
  ```

#### 2. Get Single Product
```http
GET /products/:id
```
**Responses:**
- `200`: Product object
- `404`: 
  ```json
  {
    "error": "Produkten hittades inte!"
  }
  ```
- `500`: Server error

#### 3. Create Product
```http
POST /products
```
**Auth:** Admin only

**Body:**
```json
{
  "title": "string (required)",
  "description": "string",
  "price": "number (required)",
  "category": "string (required)",
  "stock": "number",
  "image": "string"
}
```
**Responses:**
- `201`: Created product
- `400`: Invalid data
- `401`: Unauthorized

#### 4. Update Product
```http
PUT /products/:id
```
**Auth:** Admin only

**Body:** Same as Create Product

**Responses:**
- `200`: Updated product
- `404`: 
  ```json
  {
    "error": "Produkten hittades inte"
  }
  ```

### Order Endpoints

#### 1. Get All Orders
```http
GET /orders
```
**Auth:** Admin only

**Responses:**
- `200`: Array of orders
- `500`:
  ```json
  {
    "error": "Kunde inte hämta ordrar"
  }
  ```

#### 2. Create Order
```http
POST /orders
```
**Body:**
```json
{
  "email": "string (required)",
  "firstname": "string (required)",
  "lastname": "string (required)",
  "phonenumber": "string (required, 10 digits)",
  "shippingAddress": {
    "street": "string (required)",
    "number": "string (required)",
    "zipCode": "string (required, 5 digits)",
    "city": "string (required)"
  },
  "orderItem": [{
    "productId": "string (required)",
    "quantity": "number (required)"
  }]
}
```
**Responses:**
- `201`: Created order
- `400`: Invalid data
  ```json
  {
    "error": "error.message"
  }
  ```

### Category Endpoints

#### 1. Get All Categories
```http
GET /categories
```
**Responses:**
- `200`: Array of categories
- `500`:
  ```json
  {
    "error": "Något gick fel vid hämtning av kategorier"
  }
  ```

### Data Migration Endpoints

#### 1. Migrate Data
```http
POST /api/data-migration/{resource}/migrate
```
**Resource:** categories | products | orders

**Responses:**
- `200`:
  ```json
  {
    "message": "Data migrated successfully"
  }
  ```
- `500`:
  ```json
  {
    "message": "Error migrating data",
    "error": "error.message"
  }
  ```

#### 2. Teardown Data
```http
DELETE /api/data-migration/{resource}/teardown
```
**Resource:** categories | products | orders

**Responses:**
- `200`:
  ```json
  {
    "message": "Data teared down successfully"
  }
  ```
- `500`:
  ```json
  {
    "message": "Error tearing down data",
    "error": "error.message"
  }
  ```

## Common Error Responses

### Authentication Errors
- `401`: Not authenticated
  ```json
  {
    "message": "Ingen eller ogiltig token"
  }
  ```
- `403`: Not authorized (Admin only)
  ```json
  {
    "message": "Administratörsbehörighet krävs"
  }
  ```

### Validation Errors
- `400`: Bad Request
  ```json
  {
    "error": "Validation error message"
  }
  ```

### Server Errors
- `500`: Internal Server Error
  ```json
  {
    "error": "Server error message"
  }
  ```

## Data Validation Rules

### Order Validation
- Email: Must be valid email format
- Names: Only letters and åäöÅÄÖ allowed
- Phone: Exactly 10 digits
- Zip Code: Exactly 5 digits
- Street: Letters, numbers and spaces allowed
- House number: Letters and numbers allowed
- City: Only letters and spaces allowed

### Product Validation
- Title: Required
- Price: Required, must be number
- Category: Required, must exist in categories
- Stock: Must be number if provided

### User Validation
- Email: Must be unique and valid email format
- Password: Required
- FirstName: Required
- LastName: Required

