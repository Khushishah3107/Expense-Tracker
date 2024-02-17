package com.example.expensetracker.controller;


import com.example.expensetracker.exception.NotFoundException;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.Income;
import com.example.expensetracker.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class IncomeController {
    @Autowired
    IncomeRepository incomeRepository;

    @PostMapping("/income")
    Income newIncome(@RequestBody Income newIncome){

        return (Income) incomeRepository.save(newIncome);
    }
    @GetMapping("/incomes")
    List<Income> getAllIncomes(){
        return incomeRepository.findAll();
    }
    @DeleteMapping("/income/{id}")
    String deleteIncome(@PathVariable Long id)
    {
        if(!incomeRepository.existsById(id)){
            throw  new NotFoundException(id);
        }
        incomeRepository.deleteById(id);
        return "Income with id "+id+" has been deleted successfully";
    }
}
