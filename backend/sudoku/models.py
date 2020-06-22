from django.db import models


class Sudoku(models.Model):
    sudoku_hash = models.CharField(max_length=200)

    def __str__(self):
        return self.sudoku_hash
