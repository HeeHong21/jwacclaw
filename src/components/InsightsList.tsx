"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Article {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}

interface Props {
  articles: Article[];
  categories: string[];
  lang: string;
  insightImages: string[];
}

export default function InsightsList({ articles, categories, lang, insightImages }: Props) {
  const [active, setActive] = useState(categories[0]);

  const filtered =
    active === categories[0]
      ? articles
      : articles.filter((a) => a.category === active);

  return (
    <>
      <section className="bg-frost border-b border-silver">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`shrink-0 px-4 py-1.5 text-xs tracking-wide transition-colors ${
                  cat === active
                    ? "bg-navy-deep text-white"
                    : "text-midgray hover:text-navy-deep border border-silver hover:border-navy-deep/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-midgray py-12 text-center">
              {lang === "kr" ? "해당 카테고리의 기사가 없습니다." : "No articles in this category."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map((article) => {
                const idx = articles.indexOf(article);
                return (
                  <Link
                    key={article.slug}
                    href={`/${lang}/insights/${article.slug}`}
                    className="group border border-silver hover:shadow-md transition-shadow duration-200 bg-white block"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={insightImages[idx] ?? insightImages[0]}
                        alt={article.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-navy-deep/20 group-hover:bg-navy-deep/10 transition-colors duration-300" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[10px] tracking-widest uppercase text-white border border-white/50 px-2 py-0.5 bg-navy-deep/60 backdrop-blur-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-midgray mb-3">{article.date}</p>
                      <h3 className="font-display text-xl text-navy-deep group-hover:text-gold transition-colors duration-200 mb-3 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-midgray text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-silver">
                        <span className="text-xs text-gold tracking-wide">
                          {lang === "kr" ? "더 읽기 →" : "Read more →"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
