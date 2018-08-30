--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: books; Type: TABLE; Schema: public; Owner: candicet
--

CREATE TABLE public.books (
    id SERIAL PRIMARY KEY,
    author character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    isbn character varying(20) NOT NULL,
    image_url character varying(255) NOT NULL,
    description character varying(5000) NOT NULL
);


COPY public.books (id, author, title, isbn, image_url, description) FROM stdin;
1	Ann Leckie	Ancillary Justice	9780316246637	http://books.google.com/books/content?id=obAHf43THvQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	The only novel ever to win the Hugo, Nebula, and Arthur C. Clarke Awards and the first book in Ann Leckie's New York Times bestselling trilogy. On a remote, icy planet, the soldier known as Breq is drawing closer to completing her quest. Once, she was the Justice of Toren - a colossal starship with an artificial intelligence linking thousands of soldiers in the service of the Radch, the empire that conquered the galaxy. Now, an act of treachery has ripped it all away, leaving her with one fragile human body, unanswered questions, and a burning desire for vengeance.
2	Cate Holahan	Lies She Told	9781683312963	http://books.google.com/books/content?id=X0aFDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	From the author of the USA Today bestselling novel, The Widower’’s Wife, comes an electrifying story of love and deceit. The truth can be darker than fiction. Liza Cole, a once-successful novelist whose career has seen better days, has one month to write the thriller that could land her back on the bestseller list. Meanwhile, she’’s struggling to start a family, but her husband is distracted by the disappearance of his best friend, Nick. As stresses weigh her down in her professional and personal lives, Liza escapes into writing the chilling exploits of her latest heroine, Beth. Beth, a new mother, suspects her husband is cheating on her while she’’s home caring for their newborn. Angry and betrayed, she aims to catch him in the act and make him pay for shattering the illusion of their perfect life. But before she realizes what she’’s doing, she’’s tossing the body of her husband’’s mistress into the East River. Then, the lines between Liza’s fiction and her reality eerily blur. Nick’’s body is dragged from the East River, and Liza’’s husband is arrested for his murder. Before her deadline is up, Liza will have to face up to the truths about the people around her, including her own. If she doesn’’t, the end of her heroine’’s story could be the end of her own.
3	Cormac McCarthy	Blood Meridian	9780307762528	http://books.google.com/books/content?id=ZEAoe8o3gcgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	Based on incidents that took place in the southwestern United States and Mexico around 1850, this novel chronicles the crimes of a band of desperados, with a particular focus on one, the kid, a boy of fourteen
4	Michael Crichton	Jurassic Park	9780307763051	http://books.google.com/books/content?id=V5s14nks9I8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	From the author of Timeline, Sphere, and Congo, this is the classic thriller of science run amok that took the world by storm.
5	The Dark Queen	Susan Carroll	9780345437969	http://books.google.com/books/content?id=C3OODQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api	Ariane, the Lady of Faire Isle, a young woman renowned for her mystical skills, is forced into an uneasy alliance with the mysterious Comte de Renardas they struggle to defy the sinister ambitions and intrigues of the ruthless Queen Catherine de Medici and prevent the fulfillment of a terrifying prophecy, in the first volume in a new trilogy. Original. 45,000 first printing.
\.
