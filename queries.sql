use master;
drop database nutrifyhub_db;
create database nutrifyhub_db;

use nutrifyhub_db;
select * from Users;
select * from Pacients;
select * from Nutricionists;
select * from Diets;
select * from Recipes;
select * from RecipeIngredients;
select * from RecipeSteps;
select * from DietRecipes;

drop table Users;
drop table Pacients;
drop table Nutricionists;
drop table Diets;
drop table Recipes;
drop table RecipeIngredients;
drop table RecipeSteps;
drop table DietRecipes;