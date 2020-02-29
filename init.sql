--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
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
-- Name: coinbase; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.coinbase (
    id integer NOT NULL,
    access_token text NOT NULL,
    refresh_token text NOT NULL
);


ALTER TABLE public.coinbase OWNER TO "user";

--
-- Name: coinbase_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.coinbase_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coinbase_id_seq OWNER TO "user";

--
-- Name: coinbase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.coinbase_id_seq OWNED BY public.coinbase.id;


--
-- Name: coinbase_widget_exchange; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.coinbase_widget_exchange (
    id integer NOT NULL,
    user_id integer,
    currency1 text,
    currency2 text,
    timer integer,
    top_ text,
    left_ text,
    width_ text,
    height_ text
);


ALTER TABLE public.coinbase_widget_exchange OWNER TO "user";

--
-- Name: coinbase_widget_exchange_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.coinbase_widget_exchange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coinbase_widget_exchange_id_seq OWNER TO "user";

--
-- Name: coinbase_widget_exchange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.coinbase_widget_exchange_id_seq OWNED BY public.coinbase_widget_exchange.id;


--
-- Name: coinbase_widget_wallet; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.coinbase_widget_wallet (
    id integer NOT NULL,
    coinbase_id integer,
    currency text,
    timer integer,
    top_ text,
    left_ text,
    width_ text,
    height_ text
);


ALTER TABLE public.coinbase_widget_wallet OWNER TO "user";

--
-- Name: coinbase_widget_wallet_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.coinbase_widget_wallet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coinbase_widget_wallet_id_seq OWNER TO "user";

--
-- Name: coinbase_widget_wallet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.coinbase_widget_wallet_id_seq OWNED BY public.coinbase_widget_wallet.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO "user";

--
-- Name: twitter; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.twitter (
    id integer NOT NULL,
    token text NOT NULL,
    token_secret text NOT NULL,
    screen_name text NOT NULL
);


ALTER TABLE public.twitter OWNER TO "user";

--
-- Name: twitter_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.twitter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.twitter_id_seq OWNER TO "user";

--
-- Name: twitter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.twitter_id_seq OWNED BY public.twitter.id;


--
-- Name: twitter_widget_tl; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.twitter_widget_tl (
    id integer NOT NULL,
    twitter_id integer,
    type text,
    timer integer,
    top_ text,
    left_ text,
    width_ text,
    height_ text
);


ALTER TABLE public.twitter_widget_tl OWNER TO "user";

--
-- Name: twitter_widget_tl_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.twitter_widget_tl_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.twitter_widget_tl_id_seq OWNER TO "user";

--
-- Name: twitter_widget_tl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.twitter_widget_tl_id_seq OWNED BY public.twitter_widget_tl.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    coinbase_id integer,
    twitter_id integer
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO "user";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: coinbase id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase ALTER COLUMN id SET DEFAULT nextval('public.coinbase_id_seq'::regclass);


--
-- Name: coinbase_widget_exchange id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase_widget_exchange ALTER COLUMN id SET DEFAULT nextval('public.coinbase_widget_exchange_id_seq'::regclass);


--
-- Name: coinbase_widget_wallet id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase_widget_wallet ALTER COLUMN id SET DEFAULT nextval('public.coinbase_widget_wallet_id_seq'::regclass);


--
-- Name: twitter id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.twitter ALTER COLUMN id SET DEFAULT nextval('public.twitter_id_seq'::regclass);


--
-- Name: twitter_widget_tl id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.twitter_widget_tl ALTER COLUMN id SET DEFAULT nextval('public.twitter_widget_tl_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: coinbase; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.coinbase (id, access_token, refresh_token) FROM stdin;
\.


--
-- Data for Name: coinbase_widget_exchange; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.coinbase_widget_exchange (id, user_id, currency1, currency2, timer, top_, left_, width_, height_) FROM stdin;
\.


--
-- Data for Name: coinbase_widget_wallet; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.coinbase_widget_wallet (id, coinbase_id, currency, timer, top_, left_, width_, height_) FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: twitter; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.twitter (id, token, token_secret, screen_name) FROM stdin;
\.


--
-- Data for Name: twitter_widget_tl; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.twitter_widget_tl (id, twitter_id, type, timer, top_, left_, width_, height_) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (id, username, password, coinbase_id, twitter_id) FROM stdin;
\.


--
-- Name: coinbase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.coinbase_id_seq', 1, false);


--
-- Name: coinbase_widget_exchange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.coinbase_widget_exchange_id_seq', 1, false);


--
-- Name: coinbase_widget_wallet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.coinbase_widget_wallet_id_seq', 1, false);


--
-- Name: twitter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.twitter_id_seq', 1, false);


--
-- Name: twitter_widget_tl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.twitter_widget_tl_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: coinbase coinbase_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase
    ADD CONSTRAINT coinbase_pkey PRIMARY KEY (id);


--
-- Name: coinbase_widget_exchange coinbase_widget_exchange_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase_widget_exchange
    ADD CONSTRAINT coinbase_widget_exchange_pkey PRIMARY KEY (id);


--
-- Name: coinbase_widget_wallet coinbase_widget_wallet_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase_widget_wallet
    ADD CONSTRAINT coinbase_widget_wallet_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: twitter twitter_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.twitter
    ADD CONSTRAINT twitter_pkey PRIMARY KEY (id);


--
-- Name: twitter_widget_tl twitter_widget_tl_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.twitter_widget_tl
    ADD CONSTRAINT twitter_widget_tl_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: coinbase_widget_exchange coinbase_widget_exchange_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase_widget_exchange
    ADD CONSTRAINT coinbase_widget_exchange_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: coinbase_widget_wallet coinbase_widget_wallet_coinbase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.coinbase_widget_wallet
    ADD CONSTRAINT coinbase_widget_wallet_coinbase_id_fkey FOREIGN KEY (coinbase_id) REFERENCES public.coinbase(id) ON DELETE CASCADE;


--
-- Name: twitter_widget_tl twitter_widget_tl_twitter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.twitter_widget_tl
    ADD CONSTRAINT twitter_widget_tl_twitter_id_fkey FOREIGN KEY (twitter_id) REFERENCES public.twitter(id) ON DELETE CASCADE;


--
-- Name: users users_coinbase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_coinbase_id_fkey FOREIGN KEY (coinbase_id) REFERENCES public.coinbase(id);


--
-- Name: users users_twitter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_twitter_id_fkey FOREIGN KEY (twitter_id) REFERENCES public.twitter(id);


--
-- PostgreSQL database dump complete
--

