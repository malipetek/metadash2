# Fortunoff Metadash

This dashboard visualizes metadata from more than 4,000 testimonies in the
Fortunoff Video Archive for Holocaust Testimonies in order to generate summary
statistics about the entire collection and discover videos based on biographical
information about the subjects interviewed, as well as about the interviews
themselves -- who conducted the interview, and which affiliate program produced
it.

Most of this data was based on the FVAHT's database of record, ArchiveSpace, but
the birth place and birth year information was manually entered in two phases,
the latter of which was conducted in early 2019. 

This project is free and open source, published under the GNU Public License,
and it can be re-used for any purpose. While it was developed closely around the
data, in order to speed development, the code base could be adapted for a
different data set or even generalized down the road.

All of the data will be made available, and a link will be placed here at that
time. This is meant to encourage further analysis and exploration of the archive
with other tools.

# Developer notes

This project is serverless, so all of the data is loaded into the browser. The
data API is sequestered in the src/Data module, so that at some point it could
be replaced with a server.

This project is built with React, and the general approach was to abstract
inputs and visualization types (such as text input and bar graphs) from their
specific instantiation, so as much of the code is reusable as possible.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
