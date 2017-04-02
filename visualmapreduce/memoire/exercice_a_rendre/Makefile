TEX=rubber -d
all: exercice_bibliographie.pdf
%.pdf: %.tex
	$(TEX) $<
clean:
	rm -f *.ps *.dvi *.aux *.log *.bbl *.blg
