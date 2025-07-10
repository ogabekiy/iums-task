# Rasmning bazasi
FROM node:20

# Konteyner ichidagi ishchi katalog
WORKDIR /app

# package.json va yarn.lock fayllarini nusxalash
COPY package*.json ./

# Node modullarni o‘rnatish
RUN npm install

# Dastur fayllarini nusxalash
COPY . .

# Portni ochish
EXPOSE 4000

# Dastur ishga tushirish
CMD ["npm", "run", "dev"]
