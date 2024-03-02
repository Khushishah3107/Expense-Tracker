package com.example.expensetracker.controller;

import com.example.expensetracker.exception.NotFoundException;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.CategoryRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ExpenseController {
    @Autowired
    private ExpenseRepository expenseRepository;

  @Autowired
  private CategoryRepository categoryRepository;

    @Transactional
    @PostMapping("/expense")
    public ResponseEntity<String> newExpense(@RequestBody Expense newExpense) {
        try {
            if (newExpense.getCategory() != null && newExpense.getCategory().getId() != null) {
                // Retrieve the Category from the database within the same transactional context
                Category existingCategory = categoryRepository.findById(newExpense.getCategory().getId())
                        .orElseThrow(() -> new NotFoundException(newExpense.getCategory().getId()));
                newExpense.setCategory(existingCategory);
            }

            Expense savedExpense = expenseRepository.save(newExpense);
            return new ResponseEntity<>("Expense with id " + savedExpense.getId() + " has been created successfully", HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle specific exceptions, such as constraint violations
            return new ResponseEntity<>("Failed to create expense: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Handle other generic exceptions
            return new ResponseEntity<>("Failed to create expense: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/expenses")
    List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    @GetMapping("/expense/{id}")
    Expense getExpenseById(@PathVariable Long id){

        return expenseRepository.findById(id)
                .orElseThrow(()->new NotFoundException(id));
    }

    @DeleteMapping("/expense/{id}")
    String deleteExpense(@PathVariable Long id)
    {
        if(!expenseRepository.existsById(id)){
            throw  new NotFoundException(id);
        }
        expenseRepository.deleteById(id);
        return "Expense with id "+id+" has been deleted successfully";
    }
    @PutMapping("/expense/{id}")
    Expense updateExpense(@RequestBody Expense newExpense,@PathVariable Long id)
    {
        return expenseRepository.findById(id)
                .map(expense -> {
                    expense.setExpenseType(newExpense.getExpenseType());
                    expense.setExpenseDate(newExpense.getExpenseDate());
                    expense.setCost(newExpense.getCost());
                    return expenseRepository.save(expense);
                }).orElseThrow(()->new NotFoundException(id));
    }
}
