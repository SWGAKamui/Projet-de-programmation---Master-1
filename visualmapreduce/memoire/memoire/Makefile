cahier_des_besoins.pdf: cahier_des_besoins.tex bibliographie.bib
	pdflatex -synctex=1 -interaction=nonstopmode cahier_des_besoins.tex
	bibtex cahier_des_besoins.aux
	pdflatex -synctex=1 -interaction=nonstopmode cahier_des_besoins.tex
	pdflatex -synctex=1 -interaction=nonstopmode cahier_des_besoins.tex

clean:
	rm -f *.ps *.dvi *.aux *.log *.bbl *.blg *.toc *.synctex.gz
