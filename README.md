jekyll-skeleton
===============

Skeleton project for jekyll projects

# Getting up and running locally

You will need Ruby 1.9.3 installed on your machine. If your on OSX the best way to get ruby 1.9.3 installed is RVM.

$ curl -sSL https://get.rvm.io | bash -s stable

$ rvm install 1.9.3

$ rvm use 1.9.3 --default

You will need to install bundler

$ gem install bundler

Install the gem dependencies. Inside the support-docs directory run.

$ bundle install

Start jekyll locally and watch for new changes.

$ jekyll server -w

## Create a post using grunt

```
grunt post:"My awesome next post"
```
This will generate a new post file in the _posts directory.

## Helpful links

Not down with Markdown? Use this guide to get the lowdown on Markdown syntax.
http://daringfireball.net/projects/markdown/syntax

Jekyll missing some functionaility you need? Checkout the docs here to see if it's included by default.

http://jekyllrb.com/docs/home/

Or checkout this list of plugins located at the bottom of this page.

http://jekyllrb.com/docs/plugins/

