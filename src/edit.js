/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Flex,
	FlexItem,
	Button,
	TextControl,
} from "@wordpress/components";

import { useEffect, useRef } from "react"; // Import useEffect

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { lottieFile, customID } = attributes;

	const onSelectFile = (media) => {
		setAttributes({ lottieFile: media.url });
	};

	const handleCustomIDChange = (value) => {
		const sanitizedValue = value.replace(/\s+/g, "");
		setAttributes({ customID: sanitizedValue });
	};

	const lottieContainerRef = useRef(null);
	useEffect(() => {
		if (lottieFile && lottieContainerRef.current) {
			lottie.loadAnimation({
				container: lottieContainerRef.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				path: lottieFile,
			});
		}
	}, [lottieFile]);

	// useEffect(() => {
	// 	if (lottieFile && customID) {
	// 		const element = document.querySelector(`#${customID}`);
	// 		console.log("ID: #" + customID);
	// 		console.log(element);
	// 		if (element) {
	// 			lottie.loadAnimation({
	// 				container: element,
	// 				renderer: "svg",
	// 				loop: true,
	// 				autoplay: true,
	// 				path: lottieFile,
	// 			});
	// 		}
	// 	}
	// }, [lottieFile, customID]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Lottie Settings")}>
					<Flex direction="column">
						<FlexItem>
							<TextControl
								label="Lottie Animation ID"
								value={customID || ""}
								onChange={handleCustomIDChange}
							/>
						</FlexItem>
						<FlexItem>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectFile}
									allowedTypes={["text/plain"]}
									render={({ open }) => (
										<Button onClick={open} isPrimary>
											{lottieFile
												? __("Change Lottie File")
												: __("Upload Lottie File")}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						</FlexItem>
						<FlexItem>
							<span style={{ fontStyle: "italic" }}>
								*Upload Lottie animation JSON file
							</span>
						</FlexItem>
						{lottieFile && (
							<FlexItem>
								{__("Lottie File: ") + lottieFile.split("/").pop()}
							</FlexItem>
						)}
					</Flex>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div id={customID} ref={lottieContainerRef}>
					{lottieFile && customID ? (
						""
					) : (
						<p>Lottie Animation needs an ID and JSON file.</p>
					)}
				</div>
			</div>
		</>
	);
}
