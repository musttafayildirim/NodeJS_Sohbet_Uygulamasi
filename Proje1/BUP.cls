%%%%%BÝLECÝK ÞEYH EDEBALÝ ÜNÝVERSÝTESÝ MÜHENDÝSLÝK FAKÜLTESÝ%%%%%
%BÝLGÝSAYAR MÜHENDÝSLÝÐÝ PROJE I-II ÇALIÞMASI LATEX ÞABLONU
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\def\fileversion{1.1}
\def\filedate{19/12/2014}
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{BUP}[\filedate\space Version \fileversion\space by Dr.Salim CEYHAN]
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{article}%
}
\ProcessOptions\relax
\LoadClass[a4paper,12pt]{article}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage[turkish]{babel}%latex'de içindekiler, þekiller gibi 
%%baþlýklarý türkçeleþtirir.
\RequirePackage[latin5]{inputenc}%Türkçe harf paketi
\RequirePackage[T1]{fontenc}%Türkçe hecelemeyi doðru biçimde yapar
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{times}%Matematikte ve metinde Times Roman versiyonu; 
%\renewcommand\familydefault{\sfdefault}%Dökümanýnýz için default olarak sans serif fontunu kullanma.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{tikz}
%Sayfa ayarlarýný yapar.
\RequirePackage[left=4cm,right=2cm,top=3cm,bottom=3cm]{geometry}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{amssymb,amsmath,amsthm}%özel matematik yazý fontlarý
\RequirePackage{graphics,graphicx}%grafik paketlerini çaðýrýr
\RequirePackage{float}%Grafiðin veya resmin sayfanýn istenen 
%%yerinde olmasýný saðlar.
\RequirePackage{multirow}%Tablolar için özel komutlarý çaðýrýr.
\RequirePackage{setspace}%satýr boþluklarý için özel komutlarý çaðýrýr
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\renewcommand{\baselinestretch}{1.5}%Tüm metnin satýr aralýklarýný 1.5 aralýk yapar.
\setlength{\parindent}{0pt}%paragraf girintisini tanýmlar
\setlength{\parskip}{1em}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
%%iÇÝNDEKÝLERÝ BÜYÜK HARF YAPTIK
\addto\captionsturkish{\renewcommand\contentsname{ÝÇÝNDEKÝLER}}
%%%%%%%%%%%%%%%Filigran Ekleme%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%Yalnýz ilk sayfaya Filigran koyan kod.(*-dan dolayý yalnýz 
%%ilk sayfaya ekledi)%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{eso-pic}
\RequirePackage{color}
\AddToShipoutPicture*{%
\scalebox{1.3}
{\put(0,-150)
{\includegraphics[height=297mm,width=210mm]{filigran}}}}
%% lof/lot'u Toc'a ekleme paketi%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{tocloft}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\RequirePackage{totpages}%%Metnin toplam print edilecek sayfa sayýsýný verir.
\RequirePackage{verbatim}
\flushbottom%% tüm metin sayfalarýnýn ayný yükseklikte olmasýný saðlar.
\RequirePackage[pdftex, unicode, linktoc=all, hidelinks, breaklinks]{hyperref}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%