# [Tekken Space](https://tekken.space)

This repository contains tooling around Tekken 8 with the goal to provide a streamlined, user-friendly experience
when it comes to learning, creating and sharing your favorite moves and combos.

>
> A demo version of the frontend application is available under [https://tekken.space](https://tekken.space).
>
> At the moment, some of the functionality is locked behind specially flagged accounts. This includes creating and storing new combos and moves.
> This will be made available for public use, once ready.
> Until then, feel free to open an issue with a request to get access to the full functionality.

This project took a lot of inspiration from different sources, creators and developers. Please refer to the [Credits](#credits) to learn more
about the awesome resources and people making this possible.

## Contents
* [Packages](#packages)
    * [Notation Parser](#notation-parser)
* [Development](#development)
* [Deployment](#deployment)
    * [Frontend](#frontend)
* [Contributing](#contributing)
* [Credits](#credits)
* [License](#license)

## Packages
This section provides an overview about the apps and packages used in this project.

### [Notation Parser](packages/parser)
The notation parser is used to convert Tekken moves from their notation (i.e. `d/f,2`), into a visual representation of the buttons to press, similar
to the movelist in-game. It constists of a grammar that defines the Tekken notation and a parser that is able to use that grammer to provide processable output.

## Development
Install the project's dependencies via:

```bash
pnpm install
```

You can now run the project using the following command:
```bash
pnpm dev
```

Additionally, you can run test and build scripts by using their respective commands:
```bash
pnpm test
pnpm build
```

## Deployment
This app is deployed using Docker. The containers are build using GitHub Actions.
In case of needing to use or push the images directly, refer to the following list of used images.

### Frontend
```bash
docker build -t rherwig/tekken-space-web:latest .
docker push rherwig/tekken-space-web:latest
```

## Vision
As developers, we know that not every side project makes it to more than an idea. This project has already gotten further than I expected in the beginning.
But the list of wild ideas to drive this forward is nearly endless.

Some future features may include:
- Provide character overview pages that serves as an entrypoint for new players
    - This can include different moves and combos that are well-suited for starting (based on, i.e. frame data)
- Powerful filtering methods to find what you need
- Breaking down combos on a move-by-move basis

If there is something that you would like to see - let me know.

## Contributing
As of now, the most effective way to take part in developing this project is to submit your ideas, requests and bugs as a GitHub issue.
You can, of course, always submit pull-requests as well, but please don't be sad, if they do not get merged right away or will be subject to discussion.

## Credits
Creating this project would not have been possible without a set of invaluable resources.
The credits will ultimately be displayed on [Tekken Space](https://tekken.sapce) itself.

So special thanks to the following awesome resources and people behind it:

### [RBNorway](https://rbnorway.org/)
This is the go-to resource for Tekken frame data. They used to provide cheat sheets for individual characters back in Tekken 7, which served as a great inspiration for TekkenSpace.

### [Tekken 7 Combo](https://tekken7combo.kagewebsite.com/)
This site has been the main inspiration for me. I liked the idea of having an exensible online movelist and wanted to take it a step further.
Thank you, creator of this awesome tool!

### [Tekken 7 Pretty Movelist](https://mspkvp.github.io/tk7movespretty/)
This site made by fellow GitHub user [@mspkvp](https://github.com/mspkvp) is a beautiful version of the in-game movelist of Tekken 7.
Sadly, it is no longer maintained, but the author was kind enough to let everyone use what he developed.
I mainly used the site and its [code](https://github.com/mspkvp/tk7movespretty) to build the [extractor package](#extractor).
The raw move data paired with mapping files to generate human-readable output was an invaluable asset to me.

Thank you so much for building this and letting the open-source community use it!

### [TheFURY](https://www.youtube.com/@TK_TheFURY)
This is an awesome YouTube channel that demonstrates combos and moves for many Tekken characters in a beatifully edited video format.
An excellent resource for anyone wanting to improve their knowledge about combos, moves and the occasional Tekken secret.

Thanks for putting in the time and effort to make those videos!

## License
MIT
