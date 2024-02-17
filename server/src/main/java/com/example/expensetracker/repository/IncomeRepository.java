package com.example.expensetracker.repository;

import com.example.expensetracker.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeRepository extends JpaRepository<Income,Long> {
}
