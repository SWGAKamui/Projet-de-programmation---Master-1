memoire.pdf: memoire.tex memoire.bib
	pdflatex -synctex=1 -interaction=nonstopmode memoire.tex
	bibtex memoire.aux
	pdflatex -synctex=1 -interaction=nonstopmode memoire.tex
	pdflatex -synctex=1 -interaction=nonstopmode memoire.tex

clean:
	rm -f *.ps *.dvi *.aux *.log *.bbl *.blg *.toc *.synctex.gz
