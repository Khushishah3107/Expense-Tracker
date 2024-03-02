package com.example.expensetracker.dto;

import com.example.expensetracker.model.Category;

public class CategoryDto {
    private Category category;

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    // Additional method to create a new instance of CategoryDto with a Category
    public static CategoryDto fromCategory(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategory(category);
        return categoryDto;
    }
}
