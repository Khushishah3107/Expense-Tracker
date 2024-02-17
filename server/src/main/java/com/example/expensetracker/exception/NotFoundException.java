package com.example.expensetracker.exception;

public class NotFoundException extends RuntimeException{
    public NotFoundException(Long id){
        super("Could not found the entry with id "+id);
    }
}
