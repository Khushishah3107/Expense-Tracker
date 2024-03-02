package com.example.expensetracker.controller;

import com.example.expensetracker.dto.CategoryDto;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/placeCategory")
  public Category placeCategory(@RequestBody CategoryDto categoryDto){
     return categoryRepository.save(categoryDto.getCategory());
  }
  @GetMapping("/categories")
  public List<Category> findAllCategories(){
        return categoryRepository.findAll();
  }
}
