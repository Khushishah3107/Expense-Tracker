package com.example.expensetracker.controller;

import com.example.expensetracker.exception.NotFoundException;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ExpenseController {
    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/expense")
    Expense newExpense(@RequestBody Expense newExpense){

        return (Expense) expenseRepository.save(newExpense);
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
